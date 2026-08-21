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

export type MyTaskData = {
  tasks: {
    id: string;
    title: string;
    description: string | null;
    status: Status;

    deadline: Date | null;
    createdAt: Date;
  }[];

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
