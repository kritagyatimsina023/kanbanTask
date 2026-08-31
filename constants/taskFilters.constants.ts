import { TaskFilter } from "@/app/types/task.types";

export const TASK_FILTERS: { label: string; value: TaskFilter }[] = [
  { label: "Todo", value: "TODO" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Completed", value: "DONE" },
  { label: "Close to deadline", value: "CLOSE_TO_DEADLINE" },
  { label: "Overdue", value: "OVERDUE" },
];

const filterValues = TASK_FILTERS.map((f) => f.value);

export const isValidTaskFilter = (value: string | undefined | null): value is TaskFilter => {
  if (!value) return false;
  return filterValues.includes(value as TaskFilter);
};
