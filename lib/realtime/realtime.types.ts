import { NotificationType } from "@/generated/prisma/enums";

export type RealtimeNotificationPayload = {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  taskId: string | null;
  chatRoomId: string | null;
  read: boolean;
  createdAt: Date;
};
