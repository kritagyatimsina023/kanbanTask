"use client";

import { Plus } from "lucide-react";
import { useOpenModel } from "@/store/useOpenModel";

export default function NewTaskButton() {
  const { setOpen } = useOpenModel();

  return (
    <button
      className="btn btn-primary mt-4! flex items-center gap-2 px-4! py-2! md:mt-0!"
      onClick={setOpen}
    >
      <Plus size={16} />
      New Task
    </button>
  );
}
