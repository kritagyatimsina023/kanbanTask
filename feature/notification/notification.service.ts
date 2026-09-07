import { Prisma } from "@/generated/prisma/client";
import { NotificationType, Role, UserStatus } from "@/generated/prisma/enums";
import { ErrorResource } from "@/lib/errors/app-error";
import { Errors } from "@/lib/errors/errors";
import { normalizeError } from "@/lib/errors/normalizeError";
import { formatNepalDate } from "@/lib/helper";
import prisma from "@/lib/prisma";

type TransactionClient = Prisma.TransactionClient;

export class NotificationService {
  // async checkOverdueTasks() {
  //   const overdueTasks = await prisma.task.findMany({
  //     where: {
  //       deadline: {
  //         lt: new Date(),
  //       },
  //       status: {
  //         not: "DONE",
  //       },
  //       assigneeId: {
  //         not: null,
  //       },
  //     },
  //   });
  //   for (const task of overdueTasks) {
  //     if (!task.assigneeId) continue;
  //     await prisma.notification.upsert({
  //       where: {
  //         userId_taskId_type: {
  //           userId: task.assigneeId,
  //           taskId: task.id,
  //           type: "TASK_OVERDUE",
  //         },
  //       },
  //       update: {},
  //       create: {
  //         userId: task.assigneeId,
  //         taskId: task.id,
  //         type: "TASK_OVERDUE",
  //         title: "Task Overdue",
  //         message: `Your task "${task.title}" has passed its deadline.`,
  //       },
  //     });
  //   }

  //   return {
  //     checked: overdueTasks.length,
  //   };
  // }
  async createTaskAssignedNotification(
    tx: TransactionClient,
    userId: string,
    taskId: string,
    taskTitle: string,
    deadline: Date | null,
  ) {
    try {
      const deadlineText = deadline
        ? ` Deadline: ${deadline.toLocaleString("en-NP", {
            timeZone: "Asia/Kathmandu",
          })}.`
        : "";
      return tx.notification.upsert({
        where: {
          userId_taskId_type: {
            userId,
            taskId,
            type: "TASK_ASSIGNED",
          },
        },
        update: {},
        create: {
          userId,
          taskId,
          type: "TASK_ASSIGNED",
          title: "New Task Assigned",
          message: `You have been assigned the task "${taskTitle}"."${deadlineText}"`,
        },
      });
    } catch (error) {
      throw normalizeError(error, ErrorResource.NOTIFICATION);
    }
  }
  async getUserNotifications(userId: string) {
    try {
      return await prisma.notification.findMany({
        where: {
          userId,
        },
        include: {
          task: {
            select: {
              id: true,
              title: true,
              deadline: true,
              status: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (error) {
      throw normalizeError(error, ErrorResource.NOTIFICATION);
    }
  }
  async createTaskDeletedNotification(
    tx: TransactionClient,
    userId: string,
    taskTitle: string,
  ) {
    try {
      return await tx.notification.create({
        data: {
          userId,
          type: "TASK_DELETED",
          title: "Task Deleted",
          message: `The task ${taskTitle} assigned to you has been deleted`,
        },
      });
    } catch (error) {
      throw normalizeError(error, ErrorResource.NOTIFICATION);
    }
  }
  async createRewardedNotificaiton(
    tx: TransactionClient,
    userId: string,
    title: string,
    rewardMsg: string | null,
    rewardedAt: Date,
  ) {
    try {
      const notification = await tx.notification.create({
        data: {
          userId,
          type: "REWARD_GRANTED",
          title: "Reward Granted",
          message: `You have been rewarded for ${title} ${rewardMsg} at ${formatNepalDate(rewardedAt)}`,
        },
      });

      return notification;
    } catch (error) {
      throw normalizeError(error, ErrorResource.NOTIFICATION);
    }
  }
  async markAllAsRead(userId: string) {
    try {
      return prisma.notification.updateMany({
        where: {
          userId,
          read: false,
        },
        data: {
          read: true,
        },
      });
    } catch (error) {
      throw normalizeError(error, ErrorResource.NOTIFICATION);
    }
  }
  async deleteSpecificNotification(notificationId: string, userId: string) {
    try {
      const notification = await prisma.notification.findFirst({
        where: {
          id: notificationId,
          userId,
        },
      });
      if (!notification) {
        throw Errors.notFound("Notification not found", "NOTIFICATION");
      }
      return prisma.notification.delete({
        where: {
          id: notification.id,
        },
      });
    } catch (error) {
      throw normalizeError(error, ErrorResource.NOTIFICATION);
    }
  }
  async deleteAllNotification(userId: string) {
    try {
      const result = await prisma.notification.deleteMany({
        where: {
          userId,
        },
      });

      if (result.count === 0) {
        throw Errors.notFound("No notifications found", "NOTIFICATION");
      }
      return result;
    } catch (error) {
      throw normalizeError(error, ErrorResource.NOTIFICATION);
    }
  }
  async taskMessageNotification(
    tx: TransactionClient,
    senderId: string,
    taskId: string,
    message: string,
  ) {
    const task = await tx.task.findUnique({
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
    const sender = await tx.user.findUnique({
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

    let receiverId: string | null = null;

    if (sender.role === Role.MEMBER) {
      const admin = await tx.user.findFirst({
        where: {
          role: Role.ADMIN,
          status: UserStatus.ACTIVE,
        },
        select: {
          id: true,
        },
      });

      receiverId = admin?.id ?? null;
    } else {
      receiverId = task.assigneeId;
    }

    if (!receiverId || receiverId === senderId) {
      return null;
    }
    return tx.notification.create({
      data: {
        userId: receiverId,
        taskId: task.id,
        type: NotificationType.TASK_MESSAGE,
        title: `New message on "${task.title}"`,
        message: message.length > 80 ? `${message.slice(0, 80)}...` : message,
      },
    });
  }
  async chatRoomNotification(
    tx: Prisma.TransactionClient,
    chatRoomId: string,
    chatRoomName: string,
    memberIds: string[],
    creator: string,
  ) {
    return await Promise.all(
      memberIds.map((userId) =>
        tx.notification.create({
          data: {
            userId,
            chatRoomId,
            type: NotificationType.CHAT_ROOM_ADDED,
            title: "Added to Chat Room",
            message: `You have been added to ${chatRoomName} group by ${creator}`,
          },
        }),
      ),
    );
  }
  // async chatRoomNotification(
  //   tx: Prisma.TransactionClient,
  //   chatRoomId: string,
  //   chatRoomName: string,
  //   memberIds: string[],
  //   creator: string,
  // ) {
  //   try {
  //     return await Promise.all(
  //       memberIds.map((userId) =>
  //         tx.notification.create({
  //           data: {
  //             userId,
  //             chatRoomId,
  //             type: NotificationType.CHAT_ROOM_ADDED,
  //             title: "Added to Chat Room",
  //             message: `You have been added to ${chatRoomName} group by ${creator}`,
  //           },
  //         }),
  //       ),
  //     );
  //   } catch (error) {
  //     throw normalizeError(error, ErrorResource.NOTIFICATION);
  //   }
  // }
  async removedFromChatRoom(
    tx: Prisma.TransactionClient,
    userId: string,
    roomId: string,
    roomName: string,
  ) {
    try {
      return await tx.notification.create({
        data: {
          userId,
          type: NotificationType.REMOVE_FROM_ROOM,
          title: "Removed from chat room",
          message: `You have been removed from "${roomName}"`,
        },
      });
    } catch (error) {
      throw normalizeError(error, ErrorResource.NOTIFICATION);
    }
  }
}

export const notificationService = new NotificationService();
