"use server";
import { handleError } from "@/lib/errors/handle-error";
import { requireAuth } from "@/lib/auth";
import { chatRoomActionState } from "./../../../app/types/chartRoom.types";
import { createChatRoomSchema } from "@/validation/chatRoom.schema";
import { ChatRoomService } from "./chatRoom.service";

export const createChatRoomAction = async (
  _prevstate: chatRoomActionState,
  formData: FormData,
): Promise<chatRoomActionState> => {
  try {
    const session = await requireAuth();
    const membersIds = formData.getAll("membersIds");
    const parsed = createChatRoomSchema.safeParse({
      name: formData.get("name"),
      membersIds,
    });
    if (!parsed.success) {
      return {
        success: false as const,
        message: "Please fix the error",
        fieldErrors: parsed.error.flatten().fieldErrors,
      };
    }
    await ChatRoomService.createChatRoom(parsed.data, session.id);
    return {
      success: true,
      message: "Chat room created successfully",
    };
  } catch (error) {
    console.error(error);
    const handledError = handleError(error);
    return {
      success: false,
      message: "failed to create chat room",
      error: handledError.message,
      fieldErrors: {
        general: ["something went wrong"],
      },
    };
  }
};
export const deleteChatRoom = async (roomId: string) => {
  try {
    const session = await requireAuth();
    if (!roomId) {
      return {
        success: false as const,
        message: "No room selected",
      };
    }
    await ChatRoomService.deleteChatRoom(roomId, session.id);
    return {
      success: true,
      message: "Chat Room has been deleted",
    };
  } catch (error) {
    console.error(error);
    const handledError = handleError(error);
    return {
      success: false,
      message: handledError.message,
    };
  }
};
