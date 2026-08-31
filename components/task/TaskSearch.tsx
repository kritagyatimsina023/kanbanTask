"use client";

import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
};

const TaskSearch = ({
  value = "",
  onChange,
  placeholder = "Search tasks...",
  debounceMs = 400,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState(value);

  const isTyping = searchTerm.trim() !== value.trim();

  useEffect(() => {
    if (!isTyping) return;

    const timeout = setTimeout(() => {
      onChange(searchTerm.trim());
    }, debounceMs);

    return () => clearTimeout(timeout);
  }, [searchTerm, debounceMs, onChange, isTyping]);

  const clearSearch = () => {
    setSearchTerm("");
    onChange("");
  };

  return (
    <div className="relative w-full max-w-sm">
      <Search
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-9! pr-9! text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
      />

      {isTyping && searchTerm && (
        <div className="absolute right-9 top-1/2 -translate-y-1/2">
          <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-gray-200 border-t-indigo-500" />
        </div>
      )}

      {searchTerm && !isTyping && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
          aria-label="Clear search"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
};

export default TaskSearch;
