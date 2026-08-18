import { Status } from "@/generated/prisma/enums";

export interface TaskActions {
  onDelete(taskId: string): void;

  onStatusChange(taskId: string, status: Status): void;

  onReassign(taskId: string, assigneeId: string): void;
}
