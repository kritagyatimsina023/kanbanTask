"use client";

import { useState } from "react";
import { TaskFilter as TaskFilterType, MyTask } from "@/app/types/task.types";
import { filterMyTaskAction } from "../myTask.action";
import TaskFilter from "@/components/task/TaskFilter";

type Props = {
  onResults: (tasks: MyTask[] | null) => void;
};

const FilterMyTask = ({ onResults }: Props) => {
  const [isFiltering, setIsFiltering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFilter = async (filter: TaskFilterType | "") => {
    if (!filter) {
      onResults(null);
      return;
    }
    try {
      setIsFiltering(true);
      setError(null);
      const result = await filterMyTaskAction(filter);
      if (!result.success) {
        setError(result.error);
        onResults([]);
        return;
      }
      onResults(result.data);
    } catch (error) {
      console.error("Filter task error:", error);
      setError("Unable to filter tasks. Please try again.");
      onResults([]);
    } finally {
      setIsFiltering(false);
    }
  };

  return (
    <div className="relative">
      <TaskFilter onChange={handleFilter} disabled={isFiltering} />
      {error && (
        <p className="absolute left-0 top-full mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default FilterMyTask;
