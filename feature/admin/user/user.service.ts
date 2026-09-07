import "server-only";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { normalizeError } from "@/lib/errors/normalizeError";
import { ErrorResource } from "@/lib/errors/app-error";
import { Errors } from "@/lib/errors/errors";

export class UserServices {
  private getCachedUsersWithStats = unstable_cache(
    async () => {
      try {
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
          const todo = user.tasks.filter(
            (task) => task.status === "TODO",
          ).length;

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
      } catch (error) {
        throw normalizeError(error, ErrorResource.USER);
      }
    },
    ["admin-users"],
    { tags: ["admin-users"] },
  );

  async getUserWithStats() {
    return this.getCachedUsersWithStats();
  }
  async toggleBanUser(userId: string, reason?: string) {
    try {
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
        throw Errors.notFound("User not found", ErrorResource.USER);
      }
      if (user.role === "ADMIN") {
        throw Errors.unauthorized(
          "Admin accounts cannot be banned",
          ErrorResource.USER,
        );
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
      // const trimmedReason = reason?.trim();

      // if (!trimmedReason) {
      //   throw new Error("Ban reason is required");
      // }

      // if (trimmedReason.length < 5) {
      //   throw new Error("Ban reason must be at least 5 characters");
      // }
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          status: "BANNED",
          banReason: reason,
          bannedAt: new Date(),
        },
      });
      return {
        success: true,
        action: "BANNED" as const,
      };
    } catch (error) {
      throw normalizeError(error, ErrorResource.USER);
    }
  }
}
export const usersServices = new UserServices();
