"use server";
import { requireAdmin } from "@/lib/auth";
import { invalidate } from "@/lib/cache";

import { usersServices } from "./user.service";

import { handleError } from "@/lib/errors/handle-error";
import { Errors } from "@/lib/errors/errors";
import { ErrorResource } from "@/lib/errors/app-error";
import { banUserSchema } from "./user.schema";

type BanUserState = {
  success: boolean;
  error: string | null;
  message?: string;
};
export async function toggleBanUser(
  _previousState: BanUserState,
  formData: FormData,
): Promise<BanUserState> {
  try {
    await requireAdmin();

    const userId = formData.get("userId");
    const action = formData.get("action");

    if (typeof userId !== "string" || !userId.trim()) {
      return {
        success: false,
        error: "User ID is required",
      };
    }

    if (action !== "ban" && action !== "unban") {
      return {
        success: false,
        error: "Invalid user action",
      };
    }

    if (action === "ban") {
      const result = banUserSchema.safeParse({
        userId,
        reason: formData.get("reason"),
      });
      if (!result.success) {
        return {
          success: false,
          error: result.error.issues[0].message,
        };
      }
    }
    const reason =
      action === "ban" ? String(formData.get("reason") ?? "") : undefined;

    const result = await usersServices.toggleBanUser(userId, reason);

    invalidate.userBanToggled();

    return {
      success: true,
      error: null,
      message:
        result.action === "BANNED"
          ? "User banned successfully"
          : "User unbanned successfully",
    };
  } catch (error) {
    const handledError = handleError(error);
    return {
      success: false,
      error: handledError.message,
    };
  }
}
