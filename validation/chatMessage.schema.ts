import { z } from "zod";

export const createChatMessageSchema = z.object({
  roomId: z.string().min(1, "Chat room is required"),
  content: z
    .string()
    .trim()
    .min(1, "Message cannot be empty")
    .max(5000, "Message is too long"),
});
