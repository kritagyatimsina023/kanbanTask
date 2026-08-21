import { Prisma } from "@/generated/prisma/client";

export type RewardSummary = Prisma.RewardGetPayload<{
  select: {
    id: true;
    title: true;
    message: true;
    createdAt: true;
  };
}>;
