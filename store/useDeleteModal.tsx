import { create } from "zustand";

type DeleteType = "chat-room" | "task" | "chat-member" | "notification";

interface DeleteModalData {
  itemId: string;
  itemName?: string;
  targetUserId?: string;
  deleteType: DeleteType;
}

interface DeleteModalStore {
  isOpen: boolean;
  itemId: string | null;
  itemName: string | null;
  targetUserId: string;
  deleteType: DeleteType | null;
  isDeleting: boolean;

  openDeleteModal: (data: DeleteModalData) => void;
  closeDeleteModal: () => void;
  setDeleting: (value: boolean) => void;
}

const useDeleteModalStore = create<DeleteModalStore>((set) => ({
  isOpen: false,
  itemId: null,
  itemName: null,
  deleteType: null,
  isDeleting: false,
  targetUserId: "",

  openDeleteModal: (data) =>
    set({
      isOpen: true,
      itemId: data.itemId,
      itemName: data.itemName ?? null,
      targetUserId: data.targetUserId,
      deleteType: data.deleteType,
      isDeleting: false,
    }),

  closeDeleteModal: () =>
    set({
      isOpen: false,
      itemId: null,
      itemName: null,
      deleteType: null,
      isDeleting: false,
    }),

  setDeleting: (value) =>
    set({
      isDeleting: value,
    }),
}));

export default useDeleteModalStore;
