import { ErrorResource } from "./../../lib/errors/app-error";
import prisma from "@/lib/prisma";
import { Status, UserStatus } from "@/generated/prisma/enums";
import { SessionPayload } from "@/lib/auth";
import { Errors } from "@/lib/errors/errors";
import { notificationService } from "../notification/notification.service";
import { MyTaskData } from "@/app/types/task.types";
import { normalizeError } from "@/lib/errors/normalizeError";
import { leaderBoardService } from "../admin/leaderboard/leaderboard.service";
import { invalidate } from "@/lib/cache";

const PAGE_SIZE = 5;

export class TaskService {
  private getTaskPages = (page: number) =>
    (async () => {
      try {
        const skip = (page - 1) * PAGE_SIZE;
        const [tasks, totalTasks] = await Promise.all([
          prisma.task.findMany({
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
          prisma.task.count(),
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
  async getAllTasks(page = 1) {
    return this.getTaskPages(page);
  }
  async createTask(data: {
    title: string;
    description: string;
    assigneeId: string | null;
    deadline: Date | null;
  }) {
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
          throw Errors.notFound("Assignee not found", "USER");
        }
        if (assignee.status === UserStatus.BANNED) {
          throw Errors.badRequest(
            "A banned user cannot be assigned a task",
            "TASK",
          );
        }
      }
      const task = await prisma.task.create({
        data: {
          title: data.title,
          description: data.description,
          assigneeId: data.assigneeId,
          status: Status.TODO,
          deadline: data.deadline,
        },
      });
      if (task.assigneeId) {
        await notificationService.createTaskAssignedNotification(
          task.assigneeId,
          task.id,
          task.title,
          task.deadline,
        );
      }
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

      // Members can only update their own assigned tasks.
      if (session.role !== "ADMIN" && task.assigneeId !== session.id) {
        throw Errors.forbidden(
          "You can only update tasks assigned to you",
          ErrorResource.TASK,
        );
      }

      // No need to update if status hasn't changed.
      if (task.status === status) {
        return task;
      }

      const updatedTask = await prisma.task.update({
        where: {
          id: taskId,
        },
        data: {
          status,
        },
      });
      if (
        task.status !== Status.DONE &&
        status === Status.DONE &&
        task.assigneeId
      ) {
        await leaderBoardService.checkAndAwardTaskMilestone(task.assigneeId);
      }
      invalidate.leaderboard();
      return updatedTask;
    } catch (error) {
      throw normalizeError(error, ErrorResource.TASK);
    }
  }
  async updateTask(
    taskId: string,
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
      return prisma.task.update({
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
    } catch (error) {
      throw normalizeError(error, ErrorResource.TASK);
    }
  }
  async deleteTask(taskId: string) {
    try {
      const task = await prisma.task.findUnique({
        where: { id: taskId },
      });
      if (!task) {
        throw Errors.notFound("Task not found", "TASK");
      }
      if (task.assigneeId && task.status !== Status.DONE) {
        await notificationService.createTaskDeletedNotification(
          task.assigneeId,
          task.title,
        );
      }
      await prisma.task.delete({
        where: { id: taskId },
      });
      return task;
    } catch (error) {
      throw normalizeError(error, ErrorResource.TASK);
    }
  }
  async reassignTask(taskId: string, newAssigneeId: string | null) {
    try {
      const task = await prisma.task.findUnique({
        where: { id: taskId },
        select: { status: true },
      });
      if (!task) {
        throw Errors.notFound("Task not found", "TASK");
      }
      await prisma.task.update({
        where: { id: taskId },
        data: { assigneeId: newAssigneeId },
      });
      return task;
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
  async getMyTask(userId: string): Promise<MyTaskData> {
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

      // const low = tasks.filter(
      //   (task) => task.priority === Priority.LOW,
      // ).length;

      // const medium = tasks.filter(
      //   (task) => task.priority === Priority.MEDIUM,
      // ).length;

      // const high = tasks.filter(
      //   (task) => task.priority === Priority.HIGH,
      // ).length;

      return {
        tasks,
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
