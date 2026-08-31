import { User } from "@/generated/prisma/browser";

export type Member = Pick<User, "id" | "email">;
