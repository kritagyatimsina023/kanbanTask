"use server";

import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function rewardUser(
  userId: string,
  title: string,
  message?: string,
) {
  const admin = await requireAdmin();

  const trimmedTitle = title.trim();
  const trimmedMessage = message?.trim() || null;

  if (!trimmedTitle) {
    throw new Error("Reward title is required");
  }

  if (trimmedTitle.length < 3) {
    throw new Error("Reward title must be at least 3 characters");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      role: true,
      status: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.role === "ADMIN") {
    throw new Error("Admins cannot receive rewards");
  }

  if (user.status !== "ACTIVE") {
    throw new Error("Banned users cannot be rewarded");
  }

  await prisma.reward.create({
    data: {
      userId: user.id,
      title: trimmedTitle,
      message: trimmedMessage,
      awardedBy: admin.id,
    },
  });
  revalidatePath("/admin/leaderboard");
  revalidatePath("/leaderboard");
  return {
    success: true,
  };
}
