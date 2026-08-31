"use server";
import { ChatMessageActionState } from "@/app/types/chatMessage.types";
import { requireAuth } from "@/lib/auth";
import { handleError } from "@/lib/errors/handle-error";
import { createChatMessageSchema } from "@/validation/chatMessage.schema";
import { ChatMessageService } from "./chatMessage.service";

export async function sendChatMessageAction(
  prevState: ChatMessageActionState,
  formData: FormData,
): Promise<ChatMessageActionState> {
  try {
    const session = await requireAuth();
    const result = createChatMessageSchema.safeParse({
      roomId: formData.get("roomId"),
      content: formData.get("content"),
    });
    if (!result.success) {
      return {
        success: false as const,
        message: "Fix this error",
        fieldErrors: result.error.flatten().fieldErrors,
      };
    }
    await ChatMessageService.sendMessage(
      result.data.roomId,
      session.id,
      result.data.content,
    );
    return {
      success: true,
      message: "Message sent successfully",
    };
  } catch (error) {
    const handledError = handleError(error);
    return {
      success: false,
      message: handledError.message,
    };
  }
}

export async function leaveChatRoomAction(roomdId: string) {
  try {
    const session = await requireAuth();
    await ChatMessageService.leaveChatRoom(roomdId, session.id);
    return {
      success: true,
      message: "You have left the chat room",
    };
  } catch (error) {
    const handledError = handleError(error);
    return {
      success: false,
      error: handledError.message,
    };
  }
}

export async function removeMemberFromRoomAction(
  roomId: string,
  targetUserId: string,
) {
  try {
    const session = await requireAuth();

    await ChatMessageService.removeMemberFromRoom(
      roomId,
      targetUserId,
      session.id,
    );
    return {
      success: true,
      message: "Member removed from the chat room",
    };
  } catch (error) {
    const handledError = handleError(error);
    return {
      success: false,
      message: handledError.message,
    };
  }
}
