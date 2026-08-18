import "server-only";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { leaderBoardService } from "../leaderboard/leaderboard.service";
import { requireAdmin } from "@/lib/auth";

export class DashboardService {
  private getCachedDashboardStats = unstable_cache(
    async () => {
      const [
        totalUsers,
        activeTasks,
        inProgressTasks,
        completedTasks,
        totalTasks,
        totalRewards,
        rewardsThisMonth,
        users,
      ] = await Promise.all([
        prisma.user.count({
          where: {
            role: "MEMBER",
            status: "ACTIVE",
          },
        }),

        prisma.task.count({
          where: {
            status: {
              not: "DONE",
            },
          },
        }),

        prisma.task.count({
          where: {
            status: "IN_PROGRESS",
          },
        }),

        prisma.task.count({
          where: {
            status: "DONE",
          },
        }),

        prisma.task.count(),

        prisma.reward.count(),

        prisma.reward.count({
          where: {
            createdAt: {
              gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            },
          },
        }),

        prisma.user.findMany({
          where: {
            role: "MEMBER",
            status: "ACTIVE",
          },
          select: {
            id: true,
            email: true,
            _count: {
              select: {
                tasks: {
                  where: {
                    status: "DONE",
                  },
                },
                rewards: true,
              },
            },
          },
        }),
      ]);
      const leaderboard = leaderBoardService.calculateLeaderboard(users);
      return {
        totalUsers,
        activeTasks,
        inProgressTasks,
        completedTasks,
        totalTasks,
        totalRewards,
        rewardsThisMonth,
        topPerformers: leaderboard.slice(0, 3),
      };
    },
    ["admin-dashboard"],
    {
      tags: ["admin-dashboard"],
    },
  );
  async getDashboardStats() {
    await requireAdmin();
    return this.getCachedDashboardStats();
  }
}
export const dashboardService = new DashboardService();
