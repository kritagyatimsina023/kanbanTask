import { z } from "zod";

export const userSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .min(1, "Email is required")
    .max(100, "Email must be less than 100 characters"),

  password: z
    .string()
    .trim()
    .min(1, "Password is required")
    .max(100, "Password must be less than 100 characters"),
});
export type CreateUserInput = z.infer<typeof userSchema>;

export const banUserSchema = z.object({
  userId: z.string().min(1, "User Id is required"),
  reason: z
    .string()
    .trim()
    .min(1, "Ban reason is required")
    .max(500, "Ban reason cannot exceed 500 characters"),
});
export type banUserInput = z.infer<typeof banUserSchema>;
