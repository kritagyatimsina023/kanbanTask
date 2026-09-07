"use server";

import { requireAdmin } from "@/lib/auth";
import { invalidate } from "@/lib/cache";
import { revalidatePath } from "next/cache";
import { leaderBoardService } from "./leaderboard.service";
import { handleError } from "@/lib/errors/handle-error";

export type RewardUser = {
  id: string;
  email: string;
};
export type rewardState = {
  message?: string | null;
  error: string | null;
  success: boolean;
};
export async function rewardUser(
  prevState: rewardState,
  formData: FormData,
): Promise<rewardState> {
  try {
    const admin = await requireAdmin();
    const userId = formData.get("userId") as string;
    console.log(userId, "is user id ");
    const title = formData.get("title") as string;
    const message = formData.get("message") as string | undefined;
    const result = await leaderBoardService.rewarduser(
      userId,
      title,
      message,
      admin.id,
    );
    if (result) {
      revalidatePath("/admin/leaderboards");
      invalidate.rewardGranted();
      return {
        message: "User rewarded successfully.",
        error: null,
        success: true,
      };
    }
    return {
      success: false,
      error: null,
    };
  } catch (error) {
    const handledError = handleError(error);
    return {
      message: null,
      success: false as const,
      error: handledError.message,
    };
  }
}
