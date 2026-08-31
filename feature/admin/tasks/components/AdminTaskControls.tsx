"use client";

import TaskSearch from "@/components/task/TaskSearch";
import TaskFilter from "@/components/task/TaskFilter";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminTaskControls({
  initialSearch,
  initialFilter,
}: {
  initialSearch: string;
  initialFilter: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const updateUrl = (search: string, filter: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    if (filter) {
      params.set("filter", filter);
    } else {
      params.delete("filter");
    }
    router.push(`/admin/tasks?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="w-full sm:w-[300px]">
        <TaskSearch
          value={initialSearch}
          onChange={(newSearch) => updateUrl(newSearch, initialFilter)}
        />
      </div>
      <div className="w-full sm:w-[200px]">
        <TaskFilter
          value={initialFilter}
          onChange={(newFilter) => updateUrl(initialSearch, newFilter)}
        />
      </div>
    </div>
  );
}
