import prisma from "@/lib/prisma";
import { Status } from "@/generated/prisma/enums";
import { SessionPayload } from "@/lib/auth";
import { unstable_cache } from "next/cache";
import { Errors } from "@/lib/errors/errors";

const PAGE_SIZE = 5;

export class TaskService {
  private getTasksCached = (page: number) =>
    unstable_cache(
      async () => {
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
      },
      ["admin-tasks", `page-${page}`],
      {
        tags: ["admin-tasks"],
      },
    )();

  async getAllTasks(page = 1) {
    return this.getTasksCached(page);
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
      if (assignee.status === "BANNED") {
        throw Errors.badRequest(
          "A banned user cannot be assigned a task",
          "TASK",
        );
      }
    }
    await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        assigneeId: data.assigneeId,
        status: Status.TODO,
      },
    });
    // return task;
  }
  async updateStatus(taskId: string, status: Status, session: SessionPayload) {
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) throw Errors.notFound("Task not found", "TASK");
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
      throw new Error("Task not found");
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
      throw new Error("Task not found");
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
}
export const taskService = new TaskService();
