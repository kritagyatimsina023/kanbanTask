"use client";

import { ListFilter } from "lucide-react";
import { TASK_FILTERS } from "@/constants/taskFilters.constants";
import { TaskFilter as TaskFilterType } from "@/app/types/task.types";

type Props = {
  value?: string;
  onChange: (value: TaskFilterType | "") => void;
  disabled?: boolean;
};

const TaskFilter = ({ value = "", onChange, disabled = false }: Props) => {
  return (
    <div className="relative">
      <select
        value={value}
        disabled={disabled}
        onChange={(event) => {
          onChange(event.target.value as TaskFilterType | "");
        }}
        className="h-10 appearance-none rounded-lg border border-gray-200 bg-white pl-9! pr-9! text-sm text-gray-700 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <option value="" disabled={value === ""}>
          Filter tasks
        </option>
        <option value="">All Statuses</option>
        {TASK_FILTERS.map((filter) => (
          <option key={filter.value} value={filter.value}>
            {filter.label}
          </option>
        ))}
      </select>
      <ListFilter
        size={15}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
    </div>
  );
};

export default TaskFilter;
