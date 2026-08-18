import "server-only";
import { invalidate } from "@/lib/cache";
import prisma from "@/lib/prisma";
import { revalidatePath, unstable_cache } from "next/cache";

type LeaderboardUser = {
  id: string;
  email: string;
  _count: {
    tasks: number;
    rewards?: number;
  };
};
export class LeaderboardService {
  calculateLeaderboard(users: LeaderboardUser[]) {
    return users
      .map((user) => ({
        id: user.id,
        email: user.email,
        completedTasks: user._count.tasks,
        rewards: user._count.rewards ?? 0,
      }))
      .sort((a, b) => {
        if (b.completedTasks !== a.completedTasks) {
          return b.completedTasks - a.completedTasks;
        }
        return a.email.localeCompare(b.email);
      })
      .map((user, index) => ({
        ...user,
        rank: index + 1,
      }));
  }

  private getCachedLeaderBoard = unstable_cache(
    async () => {
      const users = await prisma.user.findMany({
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
            },
          },
        },
      });
      return this.calculateLeaderboard(users);
    },
    ["leaderboard"],
    { tags: ["leaderboard"] },
  );

  async getUserLeaderboardData(userId: string) {
    const leaderboard = await this.getLeaderBoard();

    const currentUser = leaderboard.find((user) => user.id === userId);

    if (!currentUser) {
      return null;
    }

    const rewards = await prisma.reward.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        title: true,
        message: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      rank: currentUser.rank,
      completedTasks: currentUser.completedTasks,
      totalMembers: leaderboard.length,
      rewards,
    };
  }

  async getLeaderBoard() {
    return this.getCachedLeaderBoard();
  }

  async rewarduser(
    userId: string,
    title: string,
    message: string | undefined,
    adminId: string,
  ) {
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
      throw new Error("user not found");
    }
    if (user.role === "ADMIN") {
      throw new Error("Admins cannot receive rewards");
    }
    if (user.status !== "ACTIVE") {
      throw new Error("Banned users cannot be rewareded");
    }
    return prisma.reward.create({
      data: {
        userId: user.id,
        title: trimmedTitle,
        message: trimmedMessage,
        awardedBy: adminId,
      },
    });
  }
}

export const leaderBoardService = new LeaderboardService();
