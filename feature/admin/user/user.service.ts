import "server-only";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export class UserServices {
  private getCachedUsersWithStats = unstable_cache(
    async () => {
      const users = await prisma.user.findMany({
        orderBy: {
          email: "asc",
        },
        select: {
          id: true,
          email: true,
          role: true,
          status: true,
          createdAt: true,

          _count: {
            select: {
              tasks: true,
            },
          },
          tasks: {
            select: {
              status: true,
            },
          },
        },
      });
      return users.map((user) => {
        const todo = user.tasks.filter((task) => task.status === "TODO").length;

        const inProgress = user.tasks.filter(
          (task) => task.status === "IN_PROGRESS",
        ).length;

        const completed = user.tasks.filter(
          (task) => task.status === "DONE",
        ).length;

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          status: user.status,
          createdAt: user.createdAt,
          totalTasks: user._count.tasks,
          todo,
          inProgress,
          completed,
        };
      });
    },
    ["admin-users"],
    { tags: ["admin-users"] },
  );

  async getUserWithStats() {
    return this.getCachedUsersWithStats();
  }

  async toggleBanUser(userId: string, reason?: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        role: true,
        status: true,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    if (user.role === "ADMIN") {
      throw new Error("Admin accounts cannot be banned");
    }
    if (user.status === "BANNED") {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          status: "ACTIVE",
          banReason: null,
          bannedAt: null,
        },
      });
      return {
        success: true,
        action: "UNBANNED" as const,
      };
    }
    const trimmedReason = reason?.trim();

    if (!trimmedReason) {
      throw new Error("Ban reason is required");
    }

    if (trimmedReason.length < 5) {
      throw new Error("Ban reason must be at least 5 characters");
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        status: "BANNED",
        banReason: trimmedReason,
        bannedAt: new Date(),
      },
    });
    return {
      success: true,
      action: "BANNED" as const,
    };
  }
}
export const usersServices = new UserServices();
