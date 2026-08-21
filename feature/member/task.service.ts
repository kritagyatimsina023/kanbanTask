import prisma from "@/lib/prisma";
import { Status, UserStatus } from "@/generated/prisma/enums";
import { SessionPayload } from "@/lib/auth";
import { Errors } from "@/lib/errors/errors";
import { notificationService } from "../notification/notification.service";
import { MyTaskData } from "@/app/types/task.types";

const PAGE_SIZE = 5;

export class TaskService {
  private getTaskPages = (page: number) =>
    (async () => {
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
  }
  async updateStatus(taskId: string, status: Status, session: SessionPayload) {
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) throw Errors.notFound("Task not found", "TASK");
    // perform global validation for session role (boolean based role verification)
    if (session.role !== "ADMIN" && task.assigneeId !== session.id) {
      throw Errors.forbidden(
        " You can only update tasks assigned to you",
        "TASK",
      );
    }
    await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        status,
      },
    });
    return task;
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
  }
  async deleteTask(taskId: string) {
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
  }
  async reassignTask(taskId: string, newAssigneeId: string | null) {
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
  }
  async getTasks(view: "mine" | "all", userId: string) {
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
  }
  async getMyTaskStats(userId: string) {
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
  }
  async getMyTask(userId: string): Promise<MyTaskData> {
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
  }
}
export const taskService = new TaskService();
