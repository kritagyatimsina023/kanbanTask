"use client";

import { MessageCircle, Trash2, Users } from "lucide-react";
import { RoomType } from "@/app/types/chartRoom.types";
import { formatNepalDate } from "@/lib/helper";

type Props = {
  room: RoomType;
  currentUserId: string;
  onOpenRoom: (roomId: string) => void;
};

const ChatRoomItem = ({ room, currentUserId, onOpenRoom }: Props) => {
  const isCreator = room.createdById === currentUserId;

  const handleDelete = () => {
    // delete logic will be handled here
  };

  return (
    <div className="group flex w-full items-center gap-4 px-5! py-4! transition hover:bg-gray-50">
      <button
        type="button"
        onClick={() => onOpenRoom(room.id)}
        className="flex min-w-0 flex-1 items-center gap-4 text-left"
      >
        {/* Avatar */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
          <MessageCircle size={21} strokeWidth={2} />
        </div>

        {/* Room information */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <h3 className="truncate text-sm font-semibold text-gray-900">
              {room.name}
            </h3>

            <span className="shrink-0 text-[11px] text-gray-400">
              {formatNepalDate(room.updatedAt)}
            </span>
          </div>

          <p className="mt-1! truncate text-xs text-gray-500">
            Created by {room.createdBy?.email}
          </p>

          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-gray-400">
            <Users size={13} />
            <span>Chat room</span>
          </div>
        </div>
      </button>

      {isCreator && (
        <button
          type="button"
          onClick={handleDelete}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 opacity-0 transition hover:bg-red-50 hover:text-red-600 group-hover:opacity-100"
          aria-label={`Delete ${room.name}`}
          title="Delete room"
        >
          <Trash2 size={17} />
        </button>
      )}
    </div>
  );
};

export default ChatRoomItem;
