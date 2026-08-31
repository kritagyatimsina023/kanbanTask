import { ErrorResource } from "@/lib/errors/app-error";
import { Errors } from "@/lib/errors/errors";
import { normalizeError } from "@/lib/errors/normalizeError";
import prisma from "@/lib/prisma";
import { notificationService } from "../notification/notification.service";

class TaskMessageService {
  // async sendMessage(taskId: string, senderId: string, message: string) {
  //   try {
  //     const task = await prisma.task.findUnique({
  //       where: {
  //         id: taskId,
  //       },
  //       select: {
  //         id: true,
  //         title: true,
  //         assigneeId: true,
  //       },
  //     });
  //     if (!task) {
  //       throw Errors.notFound("Task not found", ErrorResource.TASK);
  //     }
  //     const sender = await prisma.user.findUnique({
  //       where: {
  //         id: senderId,
  //       },
  //       select: {
  //         id: true,
  //         role: true,
  //       },
  //     });
  //     if (!sender) {
  //       throw Errors.notFound("User not found", ErrorResource.USER);
  //     }
  //     if (sender.role !== "ADMIN" && task.assigneeId !== senderId) {
  //       throw Errors.forbidden(
  //         "You can only send messages for tasks assigned to you",
  //         ErrorResource.TASK,
  //       );
  //     }
  //     const taskMessage = await prisma.taskMessage.create({
  //       data: {
  //         taskId,
  //         senderId,
  //         message,
  //       },
  //       include: {
  //         sender: {
  //           select: {
  //             id: true,
  //             email: true,
  //             role: true,
  //           },
  //         },
  //       },
  //     });
  //     await notificationService.taskMessageNotification(
  //       senderId,
  //       taskId,
  //       message,
  //     );

  //     return taskMessage;
  //   } catch (error) {
  //     throw normalizeError(error, ErrorResource.MESSAGE);
  //   }
  // }
  async sendMessage(taskId: string, senderId: string, message: string) {
    try {
      const task = await prisma.task.findUnique({
        where: {
          id: taskId,
        },
        select: {
          id: true,
          title: true,
          assigneeId: true,
        },
      });

      if (!task) {
        throw Errors.notFound("Task not found", ErrorResource.TASK);
      }

      const sender = await prisma.user.findUnique({
        where: {
          id: senderId,
        },
        select: {
          id: true,
          role: true,
        },
      });

      if (!sender) {
        throw Errors.notFound("User not found", ErrorResource.USER);
      }

      if (sender.role !== "ADMIN" && task.assigneeId !== senderId) {
        throw Errors.forbidden(
          "You can only send messages for tasks assigned to you",
          ErrorResource.TASK,
        );
      }

      let receiverId: string | null = null;

      if (sender.role === "MEMBER") {
        const admin = await prisma.user.findFirst({
          where: {
            role: "ADMIN",
            status: "ACTIVE",
          },
          select: {
            id: true,
          },
        });
        receiverId = admin?.id ?? null;
      } else {
        receiverId = task.assigneeId;
      }

      if (!receiverId) {
        throw Errors.notFound("Message receiver not found", ErrorResource.USER);
      }

      const result = await prisma.$transaction(async (tx) => {
        const taskMessage = await tx.taskMessage.create({
          data: {
            taskId,
            senderId,
            message,
          },
          include: {
            sender: {
              select: {
                id: true,
                email: true,
                role: true,
              },
            },
          },
        });
        const notification = await notificationService.taskMessageNotification(
          tx,
          senderId,
          taskId,
          message,
        );

        return {
          taskMessage,
          notification,
        };
      });
      return result.taskMessage;
    } catch (error) {
      throw normalizeError(error, ErrorResource.MESSAGE);
    }
  }
  async getUserTaskMessages(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          role: true,
        },
      });

      if (!user) {
        throw Errors.notFound("User not found", ErrorResource.USER);
      }

      const where =
        user.role === "ADMIN"
          ? {}
          : {
              task: {
                assigneeId: userId,
              },
            };
      const messages = await prisma.taskMessage.findMany({
        where,
        include: {
          task: {
            select: {
              id: true,
              title: true,
              status: true,
            },
          },
          sender: {
            select: {
              id: true,
              email: true,
              role: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      const groupedMessages = Map.groupBy(
        messages,
        (message) => message.taskId,
      );

      return Array.from(groupedMessages.entries()).map(
        ([taskId, taskMessages]) => ({
          taskId,
          task: taskMessages[0].task,
          messages: taskMessages,
        }),
      );
    } catch (error) {
      throw normalizeError(error, ErrorResource.MESSAGE);
    }
  }
  async getTaskMessages(taskId: string, userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          role: true,
        },
      });
      if (!user) {
        throw Errors.notFound("User not found", ErrorResource.USER);
      }
      const task = await prisma.task.findUnique({
        where: {
          id: taskId,
        },
        select: {
          id: true,
          assigneeId: true,
        },
      });

      if (!task) {
        throw Errors.notFound("Task not found", ErrorResource.TASK);
      }

      if (user.role !== "ADMIN" && task.assigneeId !== userId) {
        throw Errors.forbidden(
          "You can only access messages for your assigned tasks",
          ErrorResource.MESSAGE,
        );
      }
      return await prisma.taskMessage.findMany({
        where: {
          taskId,
        },
        include: {
          sender: {
            select: {
              id: true,
              email: true,
              role: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    } catch (error) {
      throw normalizeError(error, ErrorResource.MESSAGE);
    }
  }
  async markTaskMessageRead(taskId: string, userId: string) {
    try {
      return await prisma.taskMessage.updateMany({
        where: {
          taskId,
          isRead: false,
          senderId: {
            not: userId,
          },
        },
        data: {
          isRead: true,
        },
      });
    } catch (error) {
      throw normalizeError(error, ErrorResource.MESSAGE);
    }
  }
}
export const taskMessageService = new TaskMessageService();
