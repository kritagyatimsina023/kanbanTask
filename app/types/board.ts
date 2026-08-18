import { Status } from "@/generated/prisma/enums";

export interface BoardColumn {
  id: Status;
  title: string;
  color: string;
}
