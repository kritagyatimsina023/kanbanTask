// import { Task } from "@/app/types/task.types";
import { Task } from "@/generated/prisma/client";
import { create } from "zustand";

type TaskModelMode = "create" | "edit";

interface OpenModelProps {
  isOpen: boolean;
  isDeleteOpen: boolean;
  mode: TaskModelMode;
  task: Task | null;
  setOpen: () => void;
  setDeleteOpen: () => void;
  setTask: (selectedTask: Task | null) => void;
  setMode: (mode: TaskModelMode) => void;
  openCreateModal: () => void;
  openEditModal: (task: Task) => void;
  closeTaskModal: () => void;
}

export const useOpenModel = create<OpenModelProps>((set) => ({
  isOpen: false,
  isDeleteOpen: false,

  mode: "create",
  task: null,

  setOpen: () =>
    set((state) => ({
      isOpen: !state.isOpen,
    })),

  setDeleteOpen: () =>
    set((state) => ({
      isDeleteOpen: !state.isDeleteOpen,
    })),

  setTask: (selectedTask) =>
    set({
      task: selectedTask,
    }),

  setMode: (mode) =>
    set({
      mode,
    }),

  openCreateModal: () =>
    set({
      isOpen: true,
      mode: "create",
      task: null,
    }),

  openEditModal: (task) =>
    set({
      isOpen: true,
      mode: "edit",
      task,
    }),

  closeTaskModal: () =>
    set({
      isOpen: false,
      mode: "create",
      task: null,
    }),
}));
