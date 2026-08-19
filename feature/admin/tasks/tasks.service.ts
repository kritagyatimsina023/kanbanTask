// import prisma from "@/lib/prisma";
// import { unstable_cache } from "next/cache";

// const PAGE_SIZE = 5;

// export class TaskService {
//   private getTasksCached = (page: number) =>
//     unstable_cache(
//       async () => {
//         const skip = (page - 1) * PAGE_SIZE;
//         const [tasks, totalTasks] = await Promise.all([
//           prisma.task.findMany({
//             skip,
//             take: PAGE_SIZE,
//             include: {
//               assignee: {
//                 select: {
//                   id: true,
//                   email: true,
//                   role: true,
//                   status: true,
//                 },
//               },
//             },
//             orderBy: {
//               createdAt: "desc",
//             },
//           }),
//           prisma.task.count(),
//         ]);

//         return {
//           tasks,
//           totalTasks,
//           totalPages: Math.ceil(totalTasks / PAGE_SIZE),
//           currentPage: page,
//           pageSize: PAGE_SIZE,
//         };
//       },
//       ["admin-tasks", `page-${page}`],
//       {
//         tags: ["admin-tasks"],
//       },
//     )();

//   async getAllTasks(page = 1) {
//     return this.getTasksCached(page);
//   }
// }

// export const taskService = new TaskService();
