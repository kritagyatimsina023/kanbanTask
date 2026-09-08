"use client";

import { toast } from "sonner";
import Portal from "@/components/Portal";
import DeleteModel from "@/components/DeleteModel";

import useDeleteModalStore from "@/store/useDeleteModal";
import { deleteChatRoom } from "@/feature/member/chat/chatRoom.action";
import { useRouter } from "next/navigation";
import { deleteTaskAction } from "@/app/actions/tasks.action";
import { removeMemberFromRoomAction } from "@/feature/member/chat/chatMessage.action";

const GlobalDeleteModal = () => {
  const {
    isOpen,
    itemId,
    itemName,
    deleteType,
    targetUserId,
    isDeleting,
    closeDeleteModal,
    setDeleting,
  } = useDeleteModalStore();
  const router = useRouter();

  const handleDelete = async () => {
    if (!itemId || !deleteType) return;

    try {
      setDeleting(true);

      let result;

      switch (deleteType) {
        case "chat-room":
          result = await deleteChatRoom(itemId);
          break;

        case "task":
          result = await deleteTaskAction(itemId);
          break;

        case "chat-member":
          result = await removeMemberFromRoomAction(itemId, targetUserId);
          router.refresh();
          break;

        default:
          toast.error("Unsupported delete type");
          return;
      }

      console.log("DELETE RESULT:", result);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      closeDeleteModal();
    } catch (error) {
      console.error("DELETE ERROR:", error);
      toast.error("Something went wrong");
    } finally {
      setDeleting(false);
    }
  };

  const handleClose = () => {
    if (isDeleting) return;

    closeDeleteModal();
  };

  return (
    <Portal>
      <DeleteModel
        open={isOpen}
        title={deleteType === "chat-room" ? "Delete Chat Room" : "Delete Item"}
        description="This action cannot be undone."
        itemName={itemName ?? undefined}
        onClose={handleClose}
        onConfirm={handleDelete}
        loading={isDeleting}
      />
    </Portal>
  );
};

export default GlobalDeleteModal;
