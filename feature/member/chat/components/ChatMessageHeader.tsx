"use client";
import { Room } from "@/app/types/chatMessage.types";
import Tooltip from "@/components/Tooltip";
import { ArrowLeft, MoreVertical, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import MessageSettings from "./MessageSettings";
import ChatMembers from "./ChatMembers";
type props = {
  room: Room;
};

const ChatMessageHeader = ({ room }: props) => {
  const router = useRouter();
  const [openSetting, setOpenSettings] = useState(false);
  const [openMembers, setOpenMembers] = useState(false);

  return (
    <header className="flex shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4! py-3!">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
          aria-label="Go back"
        >
          <ArrowLeft size={19} />
        </button>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
          <Users size={19} />
        </div>

        {/* Room Info */}
        <div className="min-w-0">
          <h1 className="truncate text-sm font-semibold text-gray-900">
            {room.name}
          </h1>

          <div className="mt-0.5! flex items-center gap-1.5 text-xs text-gray-500">
            <Users size={12} />
            <span>{room._count.members} members</span>
            <span className="text-gray-300">•</span>
            <span className="text-green-500">Active</span>
          </div>
        </div>
      </div>
      {/* Header Actions */}
      <div className="flex shrink-0 items-center gap-1">
        <Tooltip text="Members" side="bottom">
          <button
            onClick={() => setOpenMembers(true)}
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
            aria-label="Members"
          >
            <Users size={18} />
          </button>
        </Tooltip>
        <Tooltip text="Settings" side="bottom">
          <button
            onClick={() => setOpenSettings(true)}
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
            aria-label="More options"
          >
            <MoreVertical size={18} />
          </button>
        </Tooltip>
      </div>
      {openSetting && (
        <MessageSettings room={room} onClose={() => setOpenSettings(false)} />
      )}
      {openMembers && (
        <ChatMembers
          room={room}
          open={openMembers}
          onClose={() => setOpenMembers(false)}
        />
      )}
    </header>
  );
};

export default ChatMessageHeader;
