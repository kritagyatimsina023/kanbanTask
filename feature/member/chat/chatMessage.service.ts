import { notificationService } from "@/feature/notification/notification.service";

import { ErrorResource } from "@/lib/errors/app-error";
import { Errors } from "@/lib/errors/errors";
import { normalizeError } from "@/lib/errors/normalizeError";
import prisma from "@/lib/prisma";
import { realtimePublisher } from "@/lib/realtime/realtime.publisher";
import { error } from "console";

export class chatMessageService {
  async sendMessage(roomId: string, senderId: string, content: string) {
    try {
      const memberShip = await prisma.chatRoomMember.findUnique({
        where: {
          roomId_userId: {
            roomId,
            userId: senderId,
          },
        },
        select: {
          id: true,
        },
      });
      if (!memberShip) {
        throw Errors.forbidden(
          "You are not a member for this chat room",
          ErrorResource.CHATROOM,
        );
      }
      const message = await prisma.chatMessage.create({
        data: {
          roomId,
          senderId,
          content,
        },
        include: {
          sender: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      });
      await realtimePublisher.publishMessage(message);
      return message;
    } catch (error) {
      throw normalizeError(error, ErrorResource.CHATROOM);
    }
  }
  async getRoomMessages(roomId: string, userId: string) {
    try {
      const memberShip = await prisma.chatRoomMember.findUnique({
        where: {
          roomId_userId: {
            roomId,
            userId,
          },
        },
        select: {
          id: true,
        },
      });
      if (!memberShip) {
        throw Errors.forbidden(
          "You are not a member of this chat room",
          ErrorResource.CHATROOM,
        );
      }
      return await prisma.chatMessage.findMany({
        where: {
          roomId,
        },
        orderBy: {
          createdAt: "asc",
        },
        include: {
          sender: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      });
    } catch (error) {
      throw normalizeError(error, ErrorResource.CHATROOM);
    }
  }
  async getChatRoom(roomId: string, userId: string) {
    try {
      const room = await prisma.chatRoom.findFirst({
        where: {
          id: roomId,
          members: {
            some: {
              userId,
            },
          },
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
          createdById: true,

          _count: {
            select: {
              members: true,
            },
          },
          members: {
            select: {
              id: true,
              user: {
                select: {
                  id: true,
                  email: true,
                  role: true,
                  status: true,
                },
              },
            },
          },
        },
      });

      if (!room) {
        throw normalizeError(error, ErrorResource.CHATROOM);
      }
      return room;
    } catch (error) {
      throw normalizeError(error, ErrorResource.CHATROOM);
    }
  }
  async leaveChatRoom(roomId: string, userId: string) {
    try {
      const memberShip = await prisma.chatRoomMember.findUnique({
        where: {
          roomId_userId: {
            roomId,
            userId,
          },
        },
      });
      if (!memberShip) {
        throw Errors.notFound(
          "You are not the member of this caht room",
          ErrorResource.CHATROOM,
        );
      }
      return await prisma.chatRoomMember.delete({
        where: {
          roomId_userId: {
            roomId,
            userId,
          },
        },
      });
    } catch (error) {
      throw normalizeError(error, ErrorResource.CHATROOM);
    }
  }
  async removeMemberFromRoom(
    roomId: string,
    targetUserId: string,
    creatorId: string,
  ) {
    try {
      const room = await prisma.chatRoom.findUnique({
        where: {
          id: roomId,
        },
        select: {
          id: true,
          name: true,
          createdById: true,
        },
      });

      if (!room) {
        throw Errors.notFound("Chat room not found", ErrorResource.CHATROOM);
      }

      if (room.createdById !== creatorId) {
        throw Errors.forbidden(
          "Only the chat room creator can remove members",
          ErrorResource.CHATROOM,
        );
      }

      if (targetUserId === creatorId) {
        throw Errors.badRequest(
          "You cannot remove yourself from the chat room",
          ErrorResource.CHATROOM,
        );
      }

      const membership = await prisma.chatRoomMember.findUnique({
        where: {
          roomId_userId: {
            roomId,
            userId: targetUserId,
          },
        },
      });

      if (!membership) {
        throw Errors.notFound(
          "User is not a member of this chat room",
          ErrorResource.USER,
        );
      }

      return await prisma.$transaction(async (tx) => {
        const removedMember = await tx.chatRoomMember.delete({
          where: {
            roomId_userId: {
              roomId,
              userId: targetUserId,
            },
          },
        });

        await notificationService.removedFromChatRoom(
          tx,
          targetUserId,
          room.id,
          room.name,
        );

        return removedMember;
      });
    } catch (error) {
      throw normalizeError(error, ErrorResource.CHATROOM);
    }
  }
}
export const ChatMessageService = new chatMessageService();
