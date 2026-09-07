export const REALTIME_EVENTS = {
  NOTIFICATION_NEW: "notification:new",

  CHAT_MESSAGE_NEW: "chat:message:new",
  CHAT_TYPING: "chat:typing",
  CHAT_MESSAGE_READ: "chat:message:read",
  USER_ONLINE: "user:online",
  USER_OFFLINE: "user:offline",
  TASK_MESSAGE_WITH_ADMIN: "chat:admin:message",
} as const;

export const REALTIME_CHANNELS = {
  user: (userId: string) => `private-user-${userId}`,

  chatRoom: (roomId: string) => `private-chat-room-${roomId}`,

  taskMessage: (taskId: string) => `private-task-message-${taskId}`,
} as const;
