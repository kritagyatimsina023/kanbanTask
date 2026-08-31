import { Prisma } from "@/generated/prisma/client";
import { TaskFilter } from "@/app/types/task.types";
import { Status } from "@/generated/prisma/enums";

export function buildTaskSearch(
  search: string,
): Prisma.TaskWhereInput | undefined {
  const trimmedSearch = search.trim();
  if (!trimmedSearch) return undefined;

  return {
    OR: [
      {
        title: {
          contains: trimmedSearch,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: trimmedSearch,
          mode: "insensitive",
        },
      },
    ],
  };
}

export function buildTaskFilter(
  filter: TaskFilter,
): Prisma.TaskWhereInput | undefined {
  const now = new Date();
  switch (filter) {
    case "TODO":
      return { status: Status.TODO };
    case "IN_PROGRESS":
      return { status: Status.IN_PROGRESS };
    case "DONE":
      return { status: Status.DONE };
    case "OVERDUE":
      return {
        deadline: { lt: now },
        status: { not: Status.DONE },
      };
    case "CLOSE_TO_DEADLINE":
      return {
        deadline: {
          gte: now,
          lte: new Date(now.getTime() + 24 * 60 * 60 * 1000),
        },
        status: { not: Status.DONE },
      };
    default:
      return undefined;
  }
}
export function buildTaskWhere({
  search,
  filter,
  assigneeId,
}: {
  search?: string;
  filter?: TaskFilter;
  assigneeId?: string;
}): Prisma.TaskWhereInput {
  const where: Prisma.TaskWhereInput = {};
  if (assigneeId) {
    where.assigneeId = assigneeId;
  }
  const searchWhere = search ? buildTaskSearch(search) : undefined;
  const filterWhere = filter ? buildTaskFilter(filter) : undefined;

  const andConditions: Prisma.TaskWhereInput[] = [];
  if (searchWhere) andConditions.push(searchWhere);
  if (filterWhere) andConditions.push(filterWhere);

  if (andConditions.length > 0) {
    where.AND = andConditions;
  }

  return where;
}
