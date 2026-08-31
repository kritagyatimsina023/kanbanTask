"use client";

import React, { useState } from "react";
import { LogOut, X } from "lucide-react";
import { Room } from "@/app/types/chatMessage.types";
import { leaveChatRoomAction } from "../chatMessage.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  onClose: () => void;

  loading?: boolean;
  room: Room;
};

const LeaveChatRoomModal = ({ open, onClose, room }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLeaveRoom = async (roomId: string) => {
    try {
      setLoading(true);
      const result = await leaveChatRoomAction(roomId);
      if (!result.success) {
        return;
      }
      toast.success(result.message);
      onClose();
      router.push("/member/chat");
    } catch {
    } finally {
      setLoading(false);
    }
  };
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4!"
      role="dialog"
      aria-modal="true"
      aria-labelledby="leave-room-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Close"
        >
          <X size={17} />
        </button>

        {/* Content */}
        <div className="px-6! pb-5! pt-7! text-center">
          {/* Icon */}
          <div className="mx-auto mb-4! flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
            <LogOut size={21} />
          </div>

          <h2
            id="leave-room-title"
            className="text-base font-semibold text-gray-900"
          >
            Leave this chat room?
          </h2>

          <p className="mt-2! text-sm leading-5 text-gray-500">
            You will no longer receive messages or notifications from this room.
            You can only access it again if you are added back.
          </p>
        </div>

        <div className="flex gap-3 border-t border-gray-100 bg-gray-50/70 px-5! py-4!">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 rounded-lg border border-gray-200 bg-white px-4! py-2.5! text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => handleLeaveRoom(room.id)}
            disabled={loading}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-500 px-4! py-2.5! text-sm font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Leaving...
              </>
            ) : (
              <>
                <LogOut size={16} />
                Leave room
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveChatRoomModal;
