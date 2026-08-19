"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function TaskViewToggle() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view") === "all" ? "all" : "mine";
  const handleToggle = (view: "mine" | "all") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", view);
    router.push(`?${params.toString()}`);
  };
  return (
    <div className="flex items-center rounded-lg bg-gray-100 p-1!">
      <button
        onClick={() => handleToggle("mine")}
        className={`rounded-md px-4! py-1.5! text-sm font-medium transition-colors ${
          currentView === "mine"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-500 hover:text-gray-900"
        }`}
      >
        My Tasks
      </button>
      <button
        onClick={() => handleToggle("all")}
        className={`rounded-md px-4! py-1.5! text-sm font-medium transition-colors ${
          currentView === "all"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-500 hover:text-gray-900"
        }`}
      >
        All Tasks
      </button>
    </div>
  );
}
