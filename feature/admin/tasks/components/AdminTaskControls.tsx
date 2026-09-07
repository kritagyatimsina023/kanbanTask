"use client";

import TaskSearch from "@/components/task/TaskSearch";
import TaskFilter from "@/components/task/TaskFilter";
// import { useRouter, useSearchParams } from "next/navigation";
import { useTaskFilters } from "@/hooks/useTaskFilters";

export default function AdminTaskControls({
  initialSearch,
  initialFilter,
}: {
  initialSearch: string;
  initialFilter: string;
}) {
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
