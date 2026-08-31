import { z } from "zod";
export const createChatRoomSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Room name is required")
    .max(50, "Room name must be less than 50 characters"),
  membersIds: z.array(z.string()).min(1, "Select at least one member"),
});

export type CreateChartRoomInput = z.infer<typeof createChatRoomSchema>;
