import { Prisma, Task } from "@/generated/prisma/client";
import { Status } from "@/generated/prisma/enums";
export type MyTask = Omit<Task, "assigneeId" | "updatedAt" | "assignee">;
export type MyTaskData = {
  tasks: {
    id: string;
    title: string;
    description: string | null;
    status: Status;
    deadline: Date | null;
    createdAt: Date;
  }[];
  remainingTasks: MyTask[];
  stats: {
    total: number;
    todo: number;
    inProgress: number;
    completed: number;
  };

  statusDistribution: {
    status: Status;
    label: string;
    count: number;
  }[];
};
export type TaskWithAssignee = Prisma.TaskGetPayload<{
  include: {
    assignee: {
      select: {
        id: true;
        email: true;
      };
    };
  };
}>;
export type TaskFilter =
  | "TODO"
  | "IN_PROGRESS"
  | "DONE"
  | "CLOSE_TO_DEADLINE"
  | "OVERDUE";
