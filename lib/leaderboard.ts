import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

// export async function getUserLeaderboardData(userId: string) {
//   const users = await prisma.user.findMany({
//     where: {
//       role: "MEMBER",
//       status: "ACTIVE",
//     },
//     select: {
//       id: true,
//       email: true,
//       _count: {
//         select: {
//           tasks: {
//             where: {
//               status: "DONE",
//             },
//           },
//         },
//       },
//     },
//   });

//   const leaderboard = calculateLeaderboard(users);
//   const currentUser = leaderboard.find((user) => user.id === userId);
//   if (!currentUser) {
//     return null;
//   }
//   const rewards = await prisma.reward.findMany({
//     where: {
//       userId,
//     },
//     select: {
//       id: true,
//       title: true,
//       message: true,
//       createdAt: true,
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });

//   return {
//     rank: currentUser.rank,
//     completedTasks: currentUser.completedTasks,
//     totalMembers: leaderboard.length,
//     rewards,
//   };
// }

// export async function getUserLeaderboardData(userId: string) {
//   const leaderboard = await getLeaderboard();

//   const currentUser = leaderboard.find((user) => user.id === userId);
//   if (!currentUser) {
//     return null;
//   }
//   const rewards = await prisma.reward.findMany({
//     where: {
//       userId,
//     },
//     select: {
//       id: true,
//       title: true,
//       message: true,
//       createdAt: true,
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });
//   return {
//     rank: currentUser.rank,
//     completedTasks: currentUser.completedTasks,
//     totalMembers: leaderboard.length,
//     rewards,
//   };
// }

// export const getLeaderboard = unstable_cache(
//   async () => {
//     const users = await prisma.user.findMany({
//       where: {
//         role: "MEMBER",
//         status: "ACTIVE",
//       },
//       select: {
//         id: true,
//         email: true,
//         _count: {
//           select: {
//             tasks: {
//               where: {
//                 status: "DONE",
//               },
//             },
//           },
//         },
//       },
//     });

//     return calculateLeaderboard(users);
//   },
//   ["leaderboard"],
//   {
//     tags: ["leaderboard"],
//   },
// );

// type LeaderboardUser = {
//   id: string;
//   email: string;
//   _count: {
//     tasks: number;
//     rewards?: number;
//   };
// };

// export function calculateLeaderboard(users: LeaderboardUser[]) {
//   return users
//     .map((user) => ({
//       id: user.id,
//       email: user.email,
//       completedTasks: user._count.tasks,
//       rewards: user._count.rewards ?? 0,
//     }))
//     .sort((a, b) => {
//       if (b.completedTasks !== a.completedTasks) {
//         return b.completedTasks - a.completedTasks;
//       }
//       return a.email.localeCompare(b.email);
//     })
//     .map((user, index) => ({
//       ...user,
//       rank: index + 1,
//     }));
// }
