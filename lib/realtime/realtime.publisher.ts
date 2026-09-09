// import { Server } from "socket.io";
// import { Errors } from "../errors/errors";
// import { ErrorResource } from "../errors/app-error";
// import { RealtimeNotificationPayload } from "./realtime.types";
// import { REALTIME_EVENTS } from "./realtime.events";

import { NotificationType, Role, UserStatus } from "@/generated/prisma/enums";
import { pusherServer } from "../pusher/pusher.server";
import { REALTIME_CHANNELS, REALTIME_EVENTS } from "./realtime.events";
import prisma from "../prisma";
import { TaskMessage } from "@/generated/prisma/client";

// class RealTimePublisher {
//   private io: Server | null = null;

//   initialize(io: Server) {
//     if (this.io) {
//       return;
//     }

//     this.io = io;
//   }

//   private getIO(): Server {
//     if (!this.io) {
//       throw Errors.notFound(
//         "RealtimePublisher has not been initialized",
//         ErrorResource.REALTIME,
//       );
//     }

//     return this.io;
//   }

//   publishNotification(notification: RealtimeNotificationPayload): void {
//     this.getIO()
//       .to(`user:${notification.userId}`)
//       .emit(REALTIME_EVENTS.NOTIFICATION_NEW, notification);
//   }

//   publishNotifications(notifications: RealtimeNotificationPayload[]): void {
//     const io = this.getIO();

//     for (const notification of notifications) {
//       io.to(`user:${notification.userId}`).emit(
//         REALTIME_EVENTS.NOTIFICATION_NEW,
//         notification,
//       );
//     }
//   }
// }

// export const realtimePublisher = new RealTimePublisher();

type RealTimeNotification = {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  createdAt: Date;
  taskId?: string | null;
  chatRoomId?: string | null;
};

type RealtimeChatMessage = {
  id: string;
  roomId: string;
  senderId: string;
  content: string;
  createdAt: Date;
  sender: {
    id: string;
    email: string;
  };
};

class RealtimePublisher {
  async validateAuthChananelAccess(userId: string, channelName: string) {
    if (channelName.startsWith("private-user-")) {
      const expectedChannel = `private-user-${userId}`;
      return channelName === expectedChannel;
    }

    if (channelName.startsWith(`private-chat-room-`)) {
      const roomId = channelName.replace("private-chat-room", "");
      if (!roomId) return false;
      const memberShip = await prisma.chatRoomMember.findFirst({
        where: {
          roomId,
          userId,
        },
        select: {
          id: true,
        },
      });
      return !!memberShip;
    }

    if (channelName.startsWith("private-task-message-")) {
      const taskId = channelName.replace("private-task-message-", "");
      if (!taskId) return false;

      const [user, task] = await Promise.all([
        prisma.user.findUnique({
          where: {
            id: userId,
          },
          select: {
            id: true,
            role: true,
            status: true,
          },
        }),

        prisma.task.findUnique({
          where: {
            id: taskId,
          },
          select: {
            id: true,
            assigneeId: true,
          },
        }),
      ]);
      if (!user || !task) {
        return false;
      }
      if (user.role !== Role.ADMIN) {
        return true;
      }
      if (user.status !== UserStatus.ACTIVE) {
        return false;
      }

      return task.assigneeId === userId;
    }
    return false;
  }
  async publishNotification(notification: RealTimeNotification) {
    await pusherServer.trigger(
      REALTIME_CHANNELS.user(notification.userId),
      REALTIME_EVENTS.NOTIFICATION_NEW,
      {
        ...notification,
        createdAt: notification.createdAt.toISOString(),
      },
    );
  }

  async publishNotifications(notifications: RealTimeNotification[]) {
    await Promise.all(
      notifications.map((notification) =>
        this.publishNotification(notification),
      ),
    );
  }
  async publishMessage(message: RealtimeChatMessage) {
    await pusherServer.trigger(
      REALTIME_CHANNELS.chatRoom(message.roomId),
      REALTIME_EVENTS.CHAT_MESSAGE_NEW,
      {
        ...message,
        createdAt: message.createdAt.toISOString(),
      },
    );
  }
  async publishMessageToAdmin(taskMessage: TaskMessage) {
    await pusherServer.trigger(
      REALTIME_CHANNELS.taskMessage(taskMessage.taskId),
      REALTIME_EVENTS.TASK_MESSAGE_WITH_ADMIN,
      {
        ...taskMessage,
        createdAt: taskMessage.createdAt.toISOString(),
      },
    );
  }
}

export const realtimePublisher = new RealtimePublisher();
