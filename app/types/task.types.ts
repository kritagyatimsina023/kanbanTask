import { Status } from "@prisma/client";
import { Member } from "./member.types";

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
