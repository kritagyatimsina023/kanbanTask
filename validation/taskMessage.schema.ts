import { z } from "zod";

export const sendTaskMessageSchema = z.object({
  taskId: z.string().min(1, "Task Id is required"),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(1000, "Message must be less than 1000 characters"),
});
export type SendTaskMessageInput = z.infer<typeof sendTaskMessageSchema>;
