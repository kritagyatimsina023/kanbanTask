import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .min(3, "Title must be at leasr 3 characters")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(500, "Description must be less than 500 characters"),
  assigneeId: z.string().nullable(),
  deadline: z.date().min(1, "Deadline is required"),
});
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
