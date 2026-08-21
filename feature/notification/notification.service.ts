import { Errors } from "@/lib/errors/errors";
import { formatNepalDate } from "@/lib/helper";
import prisma from "@/lib/prisma";

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
    userId: string,
    taskId: string,
    taskTitle: string,
    deadline: Date | null,
  ) {
    const deadlineText = deadline
      ? ` Deadline: ${deadline.toLocaleString("en-NP", {
          timeZone: "Asia/Kathmandu",
        })}.`
      : "";
    return prisma.notification.upsert({
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
  }
  async getUserNotifications(userId: string) {
    return prisma.notification.findMany({
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
  }
  async createTaskDeletedNotification(userId: string, taskTitle: string) {
    const notification = await prisma.notification.create({
      data: {
        userId,
        type: "TASK_DELETED",
        title: "Task Deleted",
        message: `The task ${taskTitle} assigned to you has been deleted`,
      },
    });
    // console.log(notification, "notification");
    return notification;
  }
  async createRewardedNotificaiton(
    userId: string,
    title: string,
    rewardMsg: string | null,
    rewardedAt: Date,
  ) {
    const notification = await prisma.notification.create({
      data: {
        userId,
        type: "REWARD_GRANTED",
        title: "Reward Granted",
        message: `You have been rewarded for ${title} ${rewardMsg} at ${formatNepalDate(rewardedAt)}`,
      },
    });
    console.log(notification);
    return notification;
  }
  async markAllAsRead(userId: string) {
    return prisma.notification.updateMany({
      where: {
        userId,
        read: false,
      },
      data: {
        read: true,
      },
    });
  }
  async deleteSpecificNotification(notificationId: string, userId: string) {
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
  }
  async deleteAllNotification(userId: string) {
    const result = await prisma.notification.deleteMany({
      where: {
        userId,
      },
    });

    if (result.count === 0) {
      throw Errors.notFound("No notifications found", "NOTIFICATION");
    }
    return result;
  }
}
export const notificationService = new NotificationService();
