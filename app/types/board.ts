import { Status } from "@prisma/client";

export interface BoardColumn {
  id: Status;
  title: string;
  color: string;
}
