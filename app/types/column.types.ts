import { Status } from "@/generated/prisma/enums";

export type Column = {
  id: Status;
  title: string;
  color: string;
};
