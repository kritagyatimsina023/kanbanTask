import { Status } from "@/generated/prisma/enums";
export type Task = {
  id: string;
  title: string;
  description: string | null;
  status: Status;
  assigneeId: string | null;
  assignee: {
    id: string;
    email: string;
  } | null;
};

// export const Status = {
//   TODO: "TODO",
//   IN_PROGRESS: "IN_PROGRESS",
//   DONE: "DONE",
// } as const;

// export type Status = (typeof Status)[keyof typeof Status];
