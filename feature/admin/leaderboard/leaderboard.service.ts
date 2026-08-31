import "server-only";

import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { notificationService } from "@/feature/notification/notification.service";
import { Errors } from "@/lib/errors/errors";
import { ErrorResource } from "@/lib/errors/app-error";

import { normalizeError } from "@/lib/errors/normalizeError";
import { Status } from "@/generated/prisma/enums";
import { invalidate } from "@/lib/cache";
import { Prisma } from "@/generated/prisma/client";

type LeaderboardUser = {
  id: string;
  email: string;
  points: number;
  _count: {
    tasks: number;
  };
};
export class LeaderboardService {
  calculateLeaderboard(users: LeaderboardUser[]) {
    return users
      .map((user) => ({
        id: user.id,
        email: user.email,
        completedTasks: user._count.tasks,
        points: user.points,
      }))
      .sort((a, b) => {
        if (b.points !== a.points) {
          return b.points - a.points;
        }

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
      try {
        const users = await prisma.user.findMany({
          where: {
            role: "MEMBER",
            status: "ACTIVE",
          },
          select: {
            id: true,
            email: true,
            points: true,
            _count: {
              select: {
                tasks: {
                  where: {
                    status: Status.DONE,
                  },
                },
              },
            },
            rewards: {
              select: {
                points: true,
              },
            },
          },
        });
        return this.calculateLeaderboard(users);
      } catch (error) {
        throw normalizeError(error, ErrorResource.LEADERBOARD);
      }
    },
    ["leaderboard"],
    { tags: ["leaderboard"] },
  );

  async getUserLeaderboardData(userId: string) {
    try {
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
    } catch (error) {
      throw normalizeError(error, ErrorResource.LEADERBOARD);
    }
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
    try {
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
        throw Errors.notFound("user not found", ErrorResource.USER);
      }
      if (user.role === "ADMIN") {
        throw Errors.forbidden(
          "Admins cannot receive rewards",
          ErrorResource.USER,
        );
      }
      if (user.status !== "ACTIVE") {
        throw Errors.forbidden(
          "Banned users cannot be rewareded",
          ErrorResource.USER,
        );
      }
      const rewardData = await prisma.reward.create({
        data: {
          userId: user.id,
          title: trimmedTitle,
          message: trimmedMessage,
          awardedBy: adminId,
        },
      });
      await notificationService.createRewardedNotificaiton(
        userId,
        trimmedTitle,
        trimmedMessage,
        rewardData.createdAt,
      );
      const points = 10;
      return prisma.reward.create({
        data: {
          userId: user.id,
          title: trimmedTitle,
          message: trimmedMessage,
          awardedBy: adminId,
          points,
        },
      });
    } catch (error) {
      throw normalizeError(error, ErrorResource.LEADERBOARD);
    }
  }
  // async checkAndAwardTaskMilestone(userId: string) {
  //   try {
  //     const completedTasks = await prisma.task.count({
  //       where: {
  //         assigneeId: userId,
  //         status: Status.DONE,
  //       },
  //     });

  //     if (completedTasks < 3) {
  //       return null;
  //     }
  //     const milestone = Math.floor(completedTasks / 3);
  //     const existingReward = await prisma.reward.findFirst({
  //       where: {
  //         userId,
  //         milestone,
  //       },
  //       select: {
  //         id: true,
  //       },
  //     });

  //     if (existingReward) {
  //       return null;
  //     }

  //     const points = 10;

  //     const [reward] = await prisma.$transaction([
  //       prisma.reward.create({
  //         data: {
  //           userId,
  //           title: `${milestone * 3} Tasks Completed`,
  //           message: `You completed ${milestone * 3} tasks and earned ${points} points.`,
  //           points,
  //           milestone,
  //           awardedBy: "SYSTEM",
  //         },
  //       }),
  //       prisma.user.update({
  //         where: {
  //           id: userId,
  //         },
  //         data: {
  //           points: {
  //             increment: points,
  //           },
  //         },
  //       }),
  //     ]);
  //     invalidate.leaderboard();
  //     invalidate.admin();
  //     await notificationService.createRewardedNotificaiton(
  //       userId,
  //       reward.title,
  //       reward.message,
  //       reward.createdAt,
  //     );
  //     return reward;
  //   } catch (error) {
  //     throw normalizeError(error, ErrorResource.REWARD);
  //   }
  // }
  async syncTaskMileStoneRewards(userId: string) {
    try {
      const completedTasks = await prisma.task.count({
        where: {
          assigneeId: userId,
          status: Status.DONE,
        },
      });
      const targetMilestone = Math.floor(completedTasks / 3);
      const pointsPerMilestone = 10;

      const existingRewards = await prisma.reward.findMany({
        where: {
          userId,
          awardedBy: "SYSTEM",
          milestone: {
            not: null,
          },
        },
        select: {
          id: true,
          milestone: true,
          points: true,
        },
      });

      const existingMilestones = new Set(
        existingRewards.map((reward) => reward.milestone),
      );

      const rewardsToCreate: Prisma.RewardCreateManyInput[] = [];

      for (let milestone = 1; milestone <= targetMilestone; milestone++) {
        if (!existingMilestones.has(milestone)) {
          rewardsToCreate.push({
            userId,
            title: `${milestone * 3} Tasks Completed`,
            message: `You completed ${milestone * 3} tasks and earned ${pointsPerMilestone} points.`,
            points: pointsPerMilestone,
            milestone,
            awardedBy: "SYSTEM",
          });
        }
      }

      const rewardsToRemove = existingRewards.filter(
        (reward) =>
          reward.milestone !== null && reward.milestone > targetMilestone,
      );

      const pointsToAdd = rewardsToCreate.length * pointsPerMilestone;

      const pointsToRemove = rewardsToRemove.reduce(
        (total, reward) => total + reward.points,
        0,
      );

      const pointDifference = pointsToAdd - pointsToRemove;

      const result = await prisma.$transaction(async (tx) => {
        if (rewardsToRemove.length > 0) {
          await tx.reward.deleteMany({
            where: {
              id: {
                in: rewardsToRemove.map((reward) => reward.id),
              },
            },
          });
        }

        if (rewardsToCreate.length > 0) {
          await tx.reward.createMany({
            data: rewardsToCreate,
          });
        }

        if (pointDifference !== 0) {
          await tx.user.update({
            where: {
              id: userId,
            },
            data: {
              points: {
                increment: pointDifference,
              },
            },
          });
        }
      });
      invalidate.leaderboard();
      invalidate.admin();

      return result;
    } catch (error) {
      throw normalizeError(error, ErrorResource.REWARD);
    }
  }
}

export const leaderBoardService = new LeaderboardService();
