import { ErrorResource } from "./../../lib/errors/app-error";
import prisma from "@/lib/prisma";
import { ActivityAction, Status, UserStatus } from "@/generated/prisma/enums";
import { SessionPayload } from "@/lib/auth";
import { Errors } from "@/lib/errors/errors";
import { notificationService } from "../notification/notification.service";
import { MyTask, MyTaskStatsData, TaskFilter } from "@/app/types/task.types";
import { normalizeError } from "@/lib/errors/normalizeError";
import { leaderBoardService } from "../admin/leaderboard/leaderboard.service";
import { invalidate } from "@/lib/cache";
import { buildTaskWhere } from "@/lib/task/taskQuery";
import { realtimePublisher } from "@/lib/realtime/realtime.publisher";
import { activityService } from "../activitylog/activity.service";

const PAGE_SIZE = 5;

export class TaskService {
  private getTaskPages = ({
    page,
    search,
    filter,
  }: {
    page: number;
    search?: string;
    filter?: TaskFilter;
  }) =>
    (async () => {
      try {
        const skip = (page - 1) * PAGE_SIZE;
        const where = buildTaskWhere({ search, filter });
        const [tasks, totalTasks] = await Promise.all([
          prisma.task.findMany({
            where,
            skip,
            take: PAGE_SIZE,
            include: {
              assignee: {
                select: {
                  id: true,
                  email: true,
                  role: true,
                  status: true,
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
          }),
          prisma.task.count({ where }),
        ]);
        return {
          tasks,
          totalTasks,
          totalPages: Math.ceil(totalTasks / PAGE_SIZE),
          currentPage: page,
          pageSize: PAGE_SIZE,
        };
      } catch (error) {
        throw normalizeError(error, ErrorResource.TASK);
      }
    })();
  async getAllTasks(
    params: { page?: number; search?: string; filter?: TaskFilter } = {},
  ) {
    const page = params.page || 1;
    return this.getTaskPages({
      page,
      search: params.search,
      filter: params.filter,
    });
  }
  async createTask(
    data: {
      title: string;
      description: string;
      assigneeId: string | null;
      deadline: Date | null;
    },
    createdBy: string,
  ) {
    try {
      if (data.assigneeId) {
        const assignee = await prisma.user.findUnique({
          where: {
            id: data.assigneeId,
          },
          select: {
            id: true,
            role: true,
            status: true,
          },
        });
        if (!assignee) {
          throw Errors.notFound("Assignee not found", ErrorResource.USER);
        }
        if (assignee.status === UserStatus.BANNED) {
          throw Errors.badRequest(
            "A banned user cannot be assigned a task",
            ErrorResource.TASK,
          );
        }
      }
      const result = await prisma.$transaction(async (tx) => {
        const task = await tx.task.create({
          data: {
            title: data.title,
            description: data.description,
            assigneeId: data.assigneeId,
            status: Status.TODO,
            deadline: data.deadline,
          },
        });
        const activites = [];

        const createdActivity = await activityService.create(tx, {
          action: ActivityAction.TASK_CREATED,
          userId: createdBy,
          taskId: task.id,
          metadata: {
            title: task.title,
            from: createdBy,
            to: data.assigneeId,
          },
        });
        activites.push(createdActivity);
        if (task.assigneeId) {
          const assignedActivity = await activityService.create(tx, {
            action: ActivityAction.TASK_ASSIGNED,
            userId: createdBy,
            targetUserId: task.assigneeId,
            taskId: task.id,
            metadata: {
              title: task.title,
              from: createdBy,
              to: data.assigneeId,
            },
          });
          activites.push(assignedActivity);
        }
        let notification = null;
        if (task.assigneeId) {
          notification =
            await notificationService.createTaskAssignedNotification(
              tx,
              task.assigneeId,
              task.id,
              task.title,
              task.deadline,
            );
        }
        return {
          task,
          activites,
          notification,
        };
      });
      if (result.notification) {
        await realtimePublisher.publishNotification(result.notification);
      }
      return result.task;
    } catch (error) {
      throw normalizeError(error, ErrorResource.TASK);
    }
  }
  async updateStatus(taskId: string, status: Status, session: SessionPayload) {
    try {
      const task = await prisma.task.findUnique({
        where: {
          id: taskId,
        },
      });
      if (!task) {
        throw Errors.notFound("Task not found", ErrorResource.TASK);
      }
      if (session.role !== "ADMIN" && task.assigneeId !== session.id) {
        throw Errors.forbidden(
          "You can only update tasks assigned to you",
          ErrorResource.TASK,
        );
      }
      if (task.status === status) {
        return task;
      }

      const result = await prisma.$transaction(async (tx) => {
        const updatedTask = await tx.task.update({
          where: {
            id: taskId,
          },
          data: {
            status,
          },
        });
        await activityService.create(tx, {
          action:
            status === Status.DONE
              ? ActivityAction.TASK_COMPLETED
              : ActivityAction.TASK_STATUS_CHANGED,
          userId: session.id,
          targetUserId: task.assigneeId,
          taskId,
          metadata: {
            from: task.status,
            to: status,
          },
        });
        return updatedTask;
      });

      // const updatedTask = await prisma.task.update({
      //   where: {
      //     id: taskId,
      //   },
      //   data: {
      //     status,
      //   },
      // });

      if (
        task.assigneeId &&
        (task.status === Status.DONE || status === Status.DONE)
      ) {
        await leaderBoardService.syncTaskMileStoneRewards(task.assigneeId);
      }
      invalidate.leaderboard();
      return result;
    } catch (error) {
      throw normalizeError(error, ErrorResource.TASK);
    }
  }
  async updateTask(
    taskId: string,
    userId: string,
    data: {
      title: string;
      description: string;
      assigneeId: string | null;
      deadline: Date | null;
    },
  ) {
    try {
      const existingTask = await prisma.task.findUnique({
        where: {
          id: taskId,
        },
      });
      if (!existingTask) {
        throw Errors.notFound("Task not found", "TASK");
      }

      const result = await prisma.$transaction(async (tx) => {
        const updatedTask = await tx.task.update({
          where: {
            id: taskId,
          },
          data: {
            title: data.title,
            description: data.description,
            assigneeId: data.assigneeId,
            deadline: data.deadline,
          },
        });
        await activityService.create(tx, {
          action: ActivityAction.TASK_UPDATED,
          userId,
          taskId: taskId,
          targetUserId: updatedTask.assigneeId,
          metadata: {
            title: updatedTask.title,
          },
        });
        return updatedTask;
      });
      return result;
    } catch (error) {
      throw normalizeError(error, ErrorResource.TASK);
    }
  }
  async deleteTask(taskId: string, userId: string) {
    try {
      const result = await prisma.$transaction(async (tx) => {
        const task = await tx.task.findUnique({
          where: { id: taskId },
        });
        if (!task) {
          throw Errors.notFound("Task not found", "TASK");
        }
        await activityService.create(tx, {
          action: ActivityAction.TASK_DELETED,
          userId,
          targetUserId: task.assigneeId || "",
          taskId,
          metadata: {
            title: task.title,
          },
        });
        await tx.task.delete({
          where: { id: taskId },
        });
        let notification = null;
        if (task.assigneeId && task.status !== Status.DONE) {
          notification =
            await notificationService.createTaskDeletedNotification(
              tx,
              task.assigneeId,
              task.title,
            );
        }
        return { task, notification };
      });
      if (result.notification) {
        await realtimePublisher.publishNotification(result.notification);
      }
      return result.task;
    } catch (error) {
      throw normalizeError(error, ErrorResource.TASK);
    }
  }
  // async reassignTask(
  //   taskId: string,
  //   newAssigneeId: string | null,
  //   userId: string,
  // ) {
  //   try {
  //     const result = await prisma.$transaction(async (tx) => {
  //       const task = await tx.task.findUnique({
  //         where: { id: taskId },
  //         select: { status: true, assigneeId: true, id: true },
  //       });
  //       if (!task) {
  //         throw Errors.notFound("Task not found", "TASK");
  //       }
  //       const updatedTask = await tx.task.update({
  //         where: { id: taskId },
  //         data: { assigneeId: newAssigneeId },
  //       });
  //       const assignees = await tx.user.findMany({
  //         where: {
  //           id: {
  //             in: [task.assigneeId, newAssigneeId].filter(
  //               (id): id is string => id !== null,
  //             ),
  //           },
  //         },
  //         select: {
  //           id: true,
  //           email: true,
  //         },
  //       });
  //       const oldAssignee = assignees.find(
  //         (user) => user.id === task.assigneeId,
  //       );

  //       const newAssignee = assignees.find((user) => user.id === newAssigneeId);

  //       await activityService.create(tx, {
  //         action:
  //           task.assigneeId === null && newAssigneeId !== null
  //             ? ActivityAction.TASK_ASSIGNED
  //             : task.assigneeId !== null && newAssigneeId === null
  //               ? ActivityAction.TASK_UNASSIGNED
  //               : ActivityAction.TASK_REASSIGNED,
  //         userId,
  //         taskId: task.id,
  //         targetUserId: newAssigneeId || "",
  //         metadata: {
  //           fromId: task.assigneeId,
  //           fromEmail: oldAssignee?.email ?? null,
  //           toId: newAssigneeId,
  //           toEmail: newAssignee?.email ?? null,
  //         },
  //       });
  //       return updatedTask;
  //     });
  //     return result;
  //   } catch (error) {
  //     throw normalizeError(error, ErrorResource.TASK);
  //   }
  // }
  async reassignTask(
    taskId: string,
    newAssigneeId: string | null,
    userId: string,
  ) {
    try {
      const result = await prisma.$transaction(async (tx) => {
        const task = await tx.task.findUnique({
          where: { id: taskId },
          select: {
            id: true,
            status: true,
            assigneeId: true,
          },
        });

        if (!task) {
          throw Errors.notFound("Task not found", "TASK");
        }

        if (task.assigneeId === newAssigneeId) {
          return task;
        }

        const assigneeIds = [task.assigneeId, newAssigneeId].filter(
          (id): id is string => id !== null,
        );

        const assignees = await tx.user.findMany({
          where: {
            id: {
              in: assigneeIds,
            },
          },
          select: {
            id: true,
            email: true,
          },
        });

        const oldAssignee = assignees.find(
          (user) => user.id === task.assigneeId,
        );

        const newAssignee = assignees.find((user) => user.id === newAssigneeId);

        const updatedTask = await tx.task.update({
          where: { id: taskId },
          data: {
            assigneeId: newAssigneeId,
          },
        });

        let action: ActivityAction;
        if (task.assigneeId === null && newAssigneeId !== null) {
          action = ActivityAction.TASK_ASSIGNED;
        } else if (task.assigneeId !== null && newAssigneeId === null) {
          action = ActivityAction.TASK_UNASSIGNED;
        } else {
          action = ActivityAction.TASK_REASSIGNED;
        }
        await activityService.create(tx, {
          action,
          userId,
          taskId: task.id,
          targetUserId: newAssigneeId || "",
          metadata: {
            fromId: task.assigneeId,
            fromEmail: oldAssignee?.email ?? null,
            toId: newAssigneeId,
            toEmail: newAssignee?.email ?? null,
          },
        });

        return updatedTask;
      });

      return result;
    } catch (error) {
      throw normalizeError(error, ErrorResource.TASK);
    }
  }
  async getTasks(view: "mine" | "all", userId: string) {
    try {
      // throw Errors.internal(
      //   "Unable to load tasks.Please try again",
      //   ErrorResource.TASK,
      // );
      const where =
        view === "all"
          ? {}
          : {
              assigneeId: userId,
            };
      const [tasks, members] = await Promise.all([
        prisma.task.findMany({
          where: where,
          include: {
            assignee: {
              select: {
                id: true,
                email: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        }),
        prisma.user.findMany({
          select: {
            id: true,
            email: true,
            role: true,
          },
          orderBy: {
            email: "asc",
          },
        }),
      ]);
      return {
        tasks,
        members,
      };
    } catch (error) {
      throw normalizeError(error, ErrorResource.TASK);
    }
  }
  async getMyTaskStats(userId: string) {
    try {
      const [total, todo, inProgress, completed] = await Promise.all([
        prisma.task.count({
          where: {
            assigneeId: userId,
          },
        }),
        prisma.task.count({
          where: {
            assigneeId: userId,
            status: Status.TODO,
          },
        }),
        prisma.task.count({
          where: {
            assigneeId: userId,
            status: Status.IN_PROGRESS,
          },
        }),
        prisma.task.count({
          where: {
            assigneeId: userId,
            status: Status.DONE,
          },
        }),
      ]);
      return {
        total,
        todo,
        inProgress,
        completed,
      };
    } catch (error) {
      throw normalizeError(error, ErrorResource.TASK);
    }
  }
  private getMyTaskPages = ({
    userId,
    page,
    search,
    filter,
  }: {
    userId: string;
    page: number;
    search?: string;
    filter?: TaskFilter;
  }) =>
    (async () => {
      try {
        const skip = (page - 1) * PAGE_SIZE;
        const where = buildTaskWhere({
          assigneeId: userId,
          search,
          filter,
        });
        const [tasks, totalTasks] = await Promise.all([
          prisma.task.findMany({
            where,
            skip,
            take: PAGE_SIZE,

            select: {
              id: true,
              title: true,
              description: true,
              status: true,
              deadline: true,
              createdAt: true,
            },

            orderBy: {
              createdAt: "desc",
            },
          }),

          prisma.task.count({
            where,
          }),
        ]);

        return {
          tasks,
          totalTasks,
          totalPages: Math.ceil(totalTasks / PAGE_SIZE),
          currentPage: page,
          pageSize: PAGE_SIZE,
        };
      } catch (error) {
        throw normalizeError(error, ErrorResource.TASK);
      }
    })();
  async getMyTasks(
    userId: string,
    params: {
      page?: number;
      search?: string;
      filter?: TaskFilter;
    } = {},
  ) {
    const page = params.page || 1;
    return this.getMyTaskPages({
      userId,
      page,
      search: params.search,
      filter: params.filter,
    });
  }
  async getTaskForAI(userId: string, taskId: string) {
    try {
      return await prisma.task.findFirst({
        where: {
          id: taskId,
          assigneeId: userId,
        },
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
        },
      });
    } catch (error) {
      throw normalizeError(error, ErrorResource.TASK);
    }
  }
  async searchMyTask(userId: string, search: string): Promise<MyTask[]> {
    try {
      const trimmedSearch = search.trim();
      if (!trimmedSearch) return [];
      const tasks = await prisma.task.findMany({
        where: buildTaskWhere({ search: trimmedSearch, assigneeId: userId }),
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          deadline: true,
          createdAt: true,
        },
      });
      return tasks;
    } catch (error) {
      throw normalizeError(error, ErrorResource.TASK);
    }
  }
  async filterMyTask(userId: string, filter: TaskFilter): Promise<MyTask[]> {
    try {
      const where = buildTaskWhere({ filter, assigneeId: userId });
      return await prisma.task.findMany({
        where,
        orderBy: {
          deadline: "asc",
        },
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          deadline: true,
          createdAt: true,
        },
      });
    } catch (error) {
      throw normalizeError(error, ErrorResource.TASK);
    }
  }
  async getMyTask(userId: string): Promise<MyTaskStatsData> {
    try {
      const tasks = await prisma.task.findMany({
        where: {
          assigneeId: userId,
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          deadline: true,
          createdAt: true,
        },
      });
      const total = tasks.length;
      const todo = tasks.filter((task) => task.status === Status.TODO).length;
      const inProgress = tasks.filter(
        (task) => task.status === Status.IN_PROGRESS,
      ).length;

      const completed = tasks.filter(
        (task) => task.status === Status.DONE,
      ).length;
      const activeTasks = tasks.filter(
        (task) =>
          task.status === Status.TODO || task.status === Status.IN_PROGRESS,
      );

      return {
        tasks,
        remainingTasks: activeTasks,
        stats: {
          total,
          todo,
          inProgress,
          completed,
        },
        statusDistribution: [
          {
            status: Status.TODO,
            label: "Todo",
            count: todo,
          },
          {
            status: Status.IN_PROGRESS,
            label: "In Progress",
            count: inProgress,
          },
          {
            status: Status.DONE,
            label: "Completed",
            count: completed,
          },
        ],
      };
    } catch (error) {
      throw normalizeError(error, ErrorResource.TASK);
    }
  }
}
export const taskService = new TaskService();
