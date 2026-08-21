"use server";
import { getSession } from "@/lib/auth";
import { Errors } from "@/lib/errors/errors";
import { notificationService } from "./notification.service";
import { handleError } from "@/lib/errors/handle-error";
import { success } from "zod";

export async function markAllNotificationsAsReadAction() {
  const session = await getSession();
  if (!session) throw Errors.unauthorized("Unauthorized", "AUTH");
  await notificationService.markAllAsRead(session.id);
}

export async function deleteNotificaiton(notificationId?: string) {
  try {
    const session = await getSession();
    if (!session) {
      throw Errors.unauthorized("Unauthorized", "AUTH");
    }

    if (notificationId) {
      await notificationService.deleteSpecificNotification(
        notificationId,
        session.id,
      );

      return {
        success: true as const,
        message: "Notification deleted successfully",
      };
    }
    const notificationDeleted = await notificationService.deleteAllNotification(
      session.id,
    );
    console.log("all notification Delete", notificationDeleted);
    return {
      success: true as const,
      message: "All notifications deleted successfully",
    };
  } catch (error) {
    return {
      success: false as const,
      ...handleError(error),
    };
  }
}
