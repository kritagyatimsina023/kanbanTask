import { Prisma } from "@/generated/prisma/client";

export type Notification = Prisma.NotificationGetPayload<{
  include: {
    task: {
      select: {
        title: true;
        deadline: true;
        status: true;
      };
    };
  };
}>;
