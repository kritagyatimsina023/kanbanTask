import { Prisma } from "@/generated/prisma/client";

export type ActivityWithUser = Prisma.ActivityLogGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        email: true;
      };
    };
  };
}>;
