// import prisma from "@/lib/prisma";
// import { requireAdmin } from "@/lib/auth";
// // import { calculateLeaderboard } from "@/lib/leaderboard";
// import { unstable_cache } from "next/cache";

// const getCachedDashboardStats = unstable_cache(
//   async () => {
//     const [
//       totalUsers,
//       activeTasks,
//       inProgressTasks,
//       completedTasks,
//       totalTasks,
//       totalRewards,
//       rewardsThisMonth,
//       users,
//     ] = await Promise.all([
//       prisma.user.count({
//         where: {
//           role: "MEMBER",
//           status: "ACTIVE",
//         },
//       }),
//       prisma.task.count({
//         where: {
//           status: {
//             not: "DONE",
//           },
//         },
//       }),
//       prisma.task.count({
//         where: {
//           status: "IN_PROGRESS",
//         },
//       }),
//       prisma.task.count({
//         where: {
//           status: "DONE",
//         },
//       }),
//       prisma.task.count(),
//       prisma.reward.count(),
//       prisma.reward.count({
//         where: {
//           createdAt: {
//             gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
//           },
//         },
//       }),
//       prisma.user.findMany({
//         where: {
//           role: "MEMBER",
//           status: "ACTIVE",
//         },
//         select: {
//           id: true,
//           email: true,
//           _count: {
//             select: {
//               tasks: {
//                 where: {
//                   status: "DONE",
//                 },
//               },
//               rewards: true,
//             },
//           },
//         },
//       }),
//     ]);
//     const leaderboard = calculateLeaderboard(users);
//     return {
//       totalUsers,
//       activeTasks,
//       inProgressTasks,
//       completedTasks,
//       totalTasks,
//       totalRewards,
//       rewardsThisMonth,
//       topPerformers: leaderboard.slice(0, 3),
//     };
//   },
//   ["admin-dashboard"],
//   {
//     tags: ["admin-dashboard"],
//   },
// );

// export async function getDashboardStats() {
//   await requireAdmin();
//   return getCachedDashboardStats();
// }
