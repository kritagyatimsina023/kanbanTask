import { Notification } from "@/generated/prisma/client";
import { NotificationType, Role } from "@/generated/prisma/enums";

export function nepalTimeToUTC(value: string) {
  return new Date(`${value}:00+05:45`);
}
export function utcToNepalInput(date: Date | string) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kathmandu",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
    .format(new Date(date))
    .replace(",", "")
    .replace(" ", "T");
}

export function formatNepalDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-NP", {
    timeZone: "Asia/Kathmandu",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export function DateOnly(date: Date | string) {
  return new Intl.DateTimeFormat("en-NP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export function TimeOnly(date: Date | string) {
  return new Intl.DateTimeFormat("en-NP", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export const formatMessageTime = (date: Date | string) => {
  const messageDate = new Date(date);
  const now = new Date();

  const sameDay = messageDate.toDateString() === now.toDateString();

  if (sameDay) {
    return messageDate.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return messageDate.toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });
};

export const getNotificationLink = (
  notification: Notification,
  role: Role,
): string | null => {
  switch (notification.type) {
    case NotificationType.TASK_OVERDUE:
      if (!notification.taskId) return null;

      return role === Role.ADMIN
        ? `/admin/tasks/${notification.taskId}`
        : `/member/myTasks?taskId=${notification.taskId}`;

    case NotificationType.TASK_ASSIGNED:
      if (!notification.taskId) return null;
      return role === Role.ADMIN
        ? `/admin/tasks/${notification.taskId}`
        : `/member/myTasks`;

    case NotificationType.TASK_DELETED:
      if (!notification.taskId) return null;

      return role === Role.ADMIN
        ? `/admin/tasks/${notification.taskId}`
        : `/member/myTasks`;

    case NotificationType.REWARD_GRANTED:
      return role === Role.ADMIN ? `/admin/leaderboard` : `/member/leaderboard`;

    case NotificationType.TASK_MESSAGE:
      if (!notification.taskId) return null;
      return role === Role.ADMIN
        ? `/admin/tasks/${notification.taskId}`
        : `/member/myTasks?taskId=${notification.taskId}`;

    case NotificationType.CHAT_ROOM_ADDED:
      if (!notification.chatRoomId) return null;
      return `/member/chat`;

    default:
      return null;
  }
};
