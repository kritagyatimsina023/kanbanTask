"use server";

import { sendTaskMessageSchema } from "./../../validation/taskMessage.schema";
import { handleError } from "@/lib/errors/handle-error";
import { requireAuth } from "@/lib/auth";
import { taskMessageService } from "./taskMessage.service";
import { normalizeError } from "@/lib/errors/normalizeError";
import { ErrorResource } from "@/lib/errors/app-error";
import { sendTaskMessageState } from "@/app/types/taskMessage.types";

export async function sendTaskMessage(input: unknown) {
  try {
    const session = await requireAuth();
    const result = sendTaskMessageSchema.safeParse(input);
    if (!result.success) {
      return {
        success: false,
        error: result.error.issues[0]?.message ?? "Invalid input",
      };
    }
    const message = await taskMessageService.sendMessage(
      result.data.taskId,
      session.id,
      result.data.message,
    );

    return {
      success: true,
      data: message,
    };
  } catch (error) {
    throw normalizeError(error, ErrorResource.TASK);
  }
}
export async function getMyMessages() {
  try {
    const session = await requireAuth();
    await taskMessageService.getUserTaskMessages(session.id);
  } catch (error) {
    normalizeError(error, ErrorResource.MESSAGE);
  }
}
export async function getTaskMessages(taskId: string) {
  try {
    const session = await requireAuth();
    const messages = await taskMessageService.getTaskMessages(
      taskId,
      session.id,
    );
    return {
      success: true,
      data: messages,
    };
  } catch (error) {
    throw normalizeError(error, ErrorResource.MESSAGE);
  }
}
export async function markTaskMessageAsRead(taskId: string) {
  try {
    const session = await requireAuth();
    await taskMessageService.markTaskMessageRead(taskId, session.id);
    return {
      success: true,
    };
  } catch (error) {
    throw normalizeError(error, ErrorResource.MESSAGE);
  }
}
export async function createTaskMessageAction(
  prevState: sendTaskMessageState,
  formData: FormData,
): Promise<sendTaskMessageState> {
  try {
    const session = await requireAuth();

    const rawData = {
      taskId: formData.get("taskId"),
      message: formData.get("message"),
    };
    const result = sendTaskMessageSchema.safeParse(rawData);
    if (!result.success) {
      return {
        success: false,
        error: result.error.issues[0]?.message ?? "Invalid message",
      };
    }
    const message = await taskMessageService.sendMessage(
      result.data.taskId,
      session.id,
      result.data.message,
    );
    return {
      success: true,
      error: null,
      data: message,
    };
  } catch (error) {
    const handledError = handleError(error);

    return {
      success: false,
      error: handledError.message,
    };
  }
}
