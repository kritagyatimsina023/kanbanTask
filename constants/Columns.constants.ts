import { Status } from "@/generated/prisma/enums";
export const columns = [
  {
    id: Status.TODO,
    title: "To Do",
    color: "var(--column-todo)",
  },
  {
    id: Status.IN_PROGRESS,
    title: "In Progress",
    color: "var(--column-in-progress)",
  },
  {
    id: Status.DONE,
    title: "Done",
    color: "var(--column-done)",
  },
];
