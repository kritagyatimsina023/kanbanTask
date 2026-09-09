import "server-only";
import { ActivityAction, Prisma } from "@/generated/prisma/client";
import { normalizeError } from "@/lib/errors/normalizeError";
import { ErrorResource } from "@/lib/errors/app-error";
import prisma from "@/lib/prisma";
type TransactionClient = Prisma.TransactionClient;
class ActivityService {
  async create(
    tx: TransactionClient,
    data: {
      action: ActivityAction;
      userId: string;
      targetUserId?: string | null;
      taskId?: string;
      rewardId?: string;
      chatRoomId?: string;
      metadata?: Prisma.InputJsonValue;
    },
  ) {
    try {
      return tx.activityLog.create({
        data: {
          action: data.action,
          userId: data.userId,
          taskId: data.taskId,
          targetUserId: data.targetUserId,
          rewardId: data.rewardId,
          chatRoomId: data.chatRoomId,
          metadata: data.metadata,
        },
      });
    } catch (error) {
      normalizeError(error, ErrorResource.ACTIVITY_LOG);
    }
  }
  async getAllActivity() {
    try {
      return await prisma.activityLog.findMany({
        where: {
          action: {
            notIn: [
              ActivityAction.CHAT_ROOM_CREATED,
              ActivityAction.CHAT_ROOM_DELETED,
              ActivityAction.CHAT_ROOM_MEMBER_ADDED,
              ActivityAction.CHAT_ROOM_DELETED,
              ActivityAction.CHAT_ROOM_DELETED,
            ],
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
            },
          },
          targetUser: {
            select: {
              id: true,
              email: true,
            },
          },
          task: {
            select: {
              id: true,
              title: true,
            },
          },
          reward: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      });
    } catch (error) {
      normalizeError(error, ErrorResource.ACTIVITY_LOG);
    }
  }
  async getMemberActivities(userId: string) {
    try {
      return await prisma.activityLog.findMany({
        where: {
          OR: [
            {
              userId,
            },

            {
              targetUserId: userId,
            },
            {
              chatRoom: {
                members: {
                  some: {
                    userId,
                  },
                },
              },
            },
            {
              reward: {
                userId,
              },
            },
          ],
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
            },
          },
          targetUser: {
            select: {
              id: true,
              email: true,
            },
          },
          task: {
            select: {
              id: true,
              title: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (error) {
      normalizeError(error, ErrorResource.ACTIVITY_LOG);
    }
  }
}
export const activityService = new ActivityService();
