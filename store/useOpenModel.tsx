import { Task } from "@/app/types/task.types";
import { create } from "zustand";
interface openModelProps {
  isOpen: boolean;
  setOpen: () => void;
  isDeleteOpen: boolean;
  setDeleteOpen: () => void;
  task: Task | null;
  setTask: (selectedTask: Task) => void;
}

export const useOpenModel = create<openModelProps>((set) => ({
  isOpen: false,
  isDeleteOpen: false,
  task: null,
  setTask: (selectedTask) => set(() => ({ task: selectedTask })),
  setDeleteOpen: () => set((state) => ({ isDeleteOpen: !state.isDeleteOpen })),
  setOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));
