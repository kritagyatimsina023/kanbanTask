import prisma from "@/lib/prisma";
import { Status } from "@/generated/prisma/enums";
import { invalidate } from "@/lib/cache";
import { SessionPayload } from "@/lib/auth";

export class TaskService {
  async createTask(data: {
    title: string;
    description: string;
    assigneeId: string | null;
  }) {
    const task = await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        assigneeId: data.assigneeId,
        status: Status.TODO,
      },
    });
    return task;
  }
  async updateStatus(taskId: string, status: Status, session: SessionPayload) {
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) throw new Error("Task not found");
    if (session.role !== "ADMIN" && task.assigneeId !== session.id) {
      throw new Error("Forbidden: You can only update tasks assigned to you");
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
      throw new Error("Task not found");
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
