import { notificationService } from "@/feature/notification/notification.service";
import { Role, UserStatus } from "@/generated/prisma/enums";
import { ErrorResource } from "@/lib/errors/app-error";
import { Errors } from "@/lib/errors/errors";
import { normalizeError } from "@/lib/errors/normalizeError";
import prisma from "@/lib/prisma";
import { CreateChartRoomInput } from "@/validation/chatRoom.schema";

export class chatService {
  async createChatRoom(data: CreateChartRoomInput, creatorId: string) {
    try {
      const membersIds = [...new Set(data.membersIds)].filter(
        (id) => id !== creatorId,
      );

      const users = await prisma.user.findMany({
        where: {
          id: {
            in: membersIds,
          },
          status: UserStatus.ACTIVE,
          role: Role.MEMBER,
        },
        select: {
          id: true,
        },
      });
      if (users.length !== membersIds.length) {
        throw Errors.validation(
          "one or more selected members are invalid",
          ErrorResource.USER,
        );
      }
      return await prisma.$transaction(async (tx) => {
        const chatRoom = await tx.chatRoom.create({
          data: {
            name: data.name,

            createdById: creatorId,
            members: {
              create: [
                ...membersIds.map((userId) => ({
                  userId,
                })),
                {
                  userId: creatorId,
                },
              ],
            },
          },
          include: {
            createdBy: true,
            members: {
              include: {
                user: true,
              },
            },
          },
        });
        const creatorUser = await tx.user.findUnique({
          where: {
            id: creatorId,
          },
          select: {
            email: true,
          },
        });
        await notificationService.chatRoomNotification(
          tx,
          chatRoom.id,
          chatRoom.name,
          membersIds,
          creatorUser?.email ?? "A member",
        );
        return chatRoom;
      });
      //   return await prisma.chatRoom.create({
      //     data: {
      //       name: data.name,
      //       createdById: creatorId,
      //       members: {
      //         create: [
      //           ...membersIds.map((userId) => ({
      //             userId,
      //           })),
      //           {
      //             userId: creatorId,
      //           },
      //         ],
      //       },
      //     },
      //     include: {
      //       createdBy: true,
      //       members: {
      //         include: {
      //           user: true,
      //         },
      //       },
      //     },
      //   });
    } catch (error) {
      throw normalizeError(error, ErrorResource.CHATROOM);
    }
  }
  async getChatRooms(userId: string) {
    try {
      const chatRooms = await prisma.chatRoom.findMany({
        where: {
          members: {
            some: { userId },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
          createdById: true,

          createdBy: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      });

      return chatRooms;
    } catch (error) {
      throw normalizeError(error, ErrorResource.CHATROOM);
    }
  }
  async deleteChatRoom(roomId: string, userId: string) {
    try {
      const chatRoom = await prisma.chatRoom.findUnique({
        where: {
          id: roomId,
        },
        select: {
          createdById: true,
        },
      });
      if (!chatRoom) {
        throw Errors.notFound("Chat room not found", ErrorResource.CHATROOM);
      }
      if (chatRoom?.createdById !== userId) {
        throw Errors.unauthorized(
          "Only  creator of the chat room can delete it",
          ErrorResource.USER,
        );
      }
      return await prisma.chatRoom.delete({
        where: {
          id: roomId,
        },
      });
    } catch (error) {
      throw normalizeError(error, ErrorResource.CHATROOM);
    }
  }
}
export const ChatRoomService = new chatService();
