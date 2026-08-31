"use client";

import { MyTask } from "@/app/types/task.types";
import { ListRestart } from "lucide-react";
import { useState } from "react";
import { searchMyTaskActions } from "../myTask.action";
import TaskSearch from "@/components/task/TaskSearch";

type Props = {
  onResults: (tasks: MyTask[] | null) => void;
  onGetAll: () => void;
};

const SearchMyTask = ({ onResults, onGetAll }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = async (trimmed: string) => {
    setSearchValue(trimmed);
    if (!trimmed) {
      onResults(null);
      setError(null);
      return;
    }
    try {
      setError(null);
      const result = await searchMyTaskActions(trimmed);
      if (!result.success) {
        setError(result.error);
        onResults([]);
        return;
      }
      onResults(result.data);
    } catch (error) {
      console.error("Search task error:", error);
      setError("Unable to search tasks. Please try again.");
      onResults([]);
    }
  };

  const handleGetAll = () => {
    onGetAll();
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
      <div className="w-full max-w-sm">
        <TaskSearch value={searchValue} onChange={handleSearch} />
        {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
      </div>
      <button
        type="button"
        onClick={handleGetAll}
        className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3! text-xs font-medium text-gray-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
      >
        <ListRestart size={15} />
        Get all tasks
      </button>
    </div>
  );
};

export default SearchMyTask;
