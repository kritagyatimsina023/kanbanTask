"use server";

import { requireAdmin } from "@/lib/auth";
import { invalidate } from "@/lib/cache";
import { revalidatePath } from "next/cache";
import { leaderBoardService } from "./leaderboard.service";
import { handleError } from "@/lib/errors/handle-error";

export async function rewardUser(
  userId: string,
  title: string,
  message?: string,
) {
  try {
    const admin = await requireAdmin();
    await leaderBoardService.rewarduser(userId, title, message, admin.id);

    revalidatePath("/admin/leaderboards");
    invalidate.rewardGranted();
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false as const,
      ...handleError(error),
    };
  }
}
