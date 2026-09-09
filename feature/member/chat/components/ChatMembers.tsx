"use client";

import { Search, UserRound, X, UserMinus } from "lucide-react";
import { Room } from "@/app/types/chatMessage.types";

import useDeleteModalStore from "@/store/useDeleteModal";

type Props = {
  room: Room;
  open: boolean;
  onClose: () => void;
};

const ChatMembers = ({ room, open, onClose }: Props) => {
  const openDeleteModal = useDeleteModalStore((state) => state.openDeleteModal);
  // const router = useRouter();
  if (!open) return null;

  // const handleRemoveMember = async (targetUserId: string) => {
  //   try {
  //     const result = await removeMemberFromRoomAction(room.id, targetUserId);
  //     if (!result.success) {
  //       toast.error(result.message);
  //       return;
  //     }
  //     toast.success(result.message);
  //     router.refresh();
  //   } catch (error) {
  //     console.error("Failed to remove member:", error);
  //     toast.error("Failed to remove member");
  //   }
  // };

  const handleDeleteMember = (targetUserId: string, memberEmail: string) => {
    openDeleteModal({
      itemId: room.id,
      itemName: memberEmail,
      targetUserId,
      deleteType: "chat-member",
    });
  };

  const members = room.members;
  return (
    <div className="fixed inset-0 z-[90]">
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col border-l border-gray-200 bg-white shadow-2xl">
        {" "}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-5! py-4!">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Chat members
            </h2>
            <p className="mt-0.5! text-xs text-gray-500">
              {room._count.members} members in this room
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close members"
          >
            <X size={18} />
          </button>
        </div>
        {/* Search */}
        <div className="shrink-0 border-b border-gray-100 px-5! py-3!">
          <div className="flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3">
            <Search size={16} className="shrink-0 text-gray-400" />
            <input
              type="text"
              placeholder="Search members..."
              className="min-w-0 flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
            />
          </div>
        </div>
        {/* Members */}
        <div className="min-h-0 flex-1 overflow-y-auto px-3! py-3!">
          {/* Section */}
          <div className="mb-2 px-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Members
            </p>
          </div>

          <div className="space-y-1">
            {members.map((member) => (
              <div
                key={member.id}
                className="group flex items-center gap-3 rounded-xl px-2! py-2.5! transition hover:bg-gray-50"
              >
                <div className="relative shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                    <UserRound size={18} />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-800">
                    {member.user.email}
                  </p>
                  <p className="lowercase text-xs font-medium text-gray-500">
                    {member.user.role}
                  </p>
                </div>

                <button
                  onClick={() =>
                    handleDeleteMember(member.user.id, member.user.email)
                  }
                  type="button"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 opacity-0 transition hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
                  aria-label={`Remove ${member.user.email}`}
                  title="Remove member"
                >
                  <UserMinus size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Footer */}
        <div className="shrink-0 border-t border-gray-100 bg-gray-50/70 px-5! py-3!">
          <p className="text-center text-xs text-gray-400">
            Only room Creator can remove members.
          </p>
        </div>
      </aside>
    </div>
  );
};

export default ChatMembers;
