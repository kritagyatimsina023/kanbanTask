import { Status } from "@/generated/prisma/enums";
export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: Status;
  deadline: Date | null;
  assigneeId: string | null;
  createdAt: Date;
  updatedAt: Date;

  assignee?: {
    id: string;
    email: string;
  } | null;
}

// export const Status = {
//   TODO: "TODO",
//   IN_PROGRESS: "IN_PROGRESS",
//   DONE: "DONE",
// } as const;

// export type Status = (typeof Status)[keyof typeof Status];
