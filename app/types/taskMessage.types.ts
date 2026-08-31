import { Role, Status } from "@/generated/prisma/client";

export type TaskMessageData = {
  id: string;
  message: string;
  taskId: string;
  senderId: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
  sender: {
    id: string;
    email: string;
    role: Role;
  };
};
export type Conversation = {
  taskId: string;
  task: {
    id: string;
    title: string;
    status: Status;
  };

  messages: TaskMessageData[];
};
export interface sendTaskMessageState {
  success: boolean;
  error: string | null;
  data?: TaskMessageData;
}
