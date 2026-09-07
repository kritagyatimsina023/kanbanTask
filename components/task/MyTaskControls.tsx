"use client";

import TaskSearch from "@/components/task/TaskSearch";
import TaskFilter from "@/components/task/TaskFilter";
import { useTaskFilters } from "@/hooks/useTaskFilters";

type Props = {
  initialSearch: string;
  initialFilter: string;
};

export default function MyTaskControls({
  initialSearch,
  initialFilter,
}: Props) {
  const { updateFilter, updateSearch } = useTaskFilters();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="w-full sm:w-[300px]">
        <TaskSearch value={initialSearch} onChange={updateSearch} />
      </div>

      <div className="w-full sm:w-[200px]">
        <TaskFilter value={initialFilter} onChange={updateFilter} />
      </div>
    </div>
  );
}
