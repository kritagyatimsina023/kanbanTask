"use client";

import React, { useEffect, useRef, useState } from "react";
import { BellOff, Info, LogOut, Search, Trash2, X } from "lucide-react";
import LeaveChatRoomModal from "./LeaveChatRoomModel";
import { Room } from "@/app/types/chatMessage.types";

type Props = {
  onClose?: () => void;
  room: Room;
};

const MessageSettings = ({ onClose, room }: Props) => {
  const [openLeaveModal, setOpenLeaveModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="absolute right-4 top-16 z-50 w-72 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-4! py-3!">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">Chat settings</h2>
          <p className="mt-0.5! text-xs text-gray-500">
            Manage this conversation
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          aria-label="Close settings"
        >
          <X size={17} />
        </button>
      </div>

      {/* Options */}
      <div className="p-2!">
        {/* Room Info */}
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-3! py-2.5! text-left transition hover:bg-gray-50"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
            <Info size={17} />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-800">
              Room information
            </p>
            <p className="text-xs text-gray-500">
              View room details and members
            </p>
          </div>
        </button>

        {/* Search */}
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-3! py-2.5! text-left transition hover:bg-gray-50"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600">
            <Search size={17} />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-800">
              Search conversation
            </p>
            <p className="text-xs text-gray-500">Find messages in this chat</p>
          </div>
        </button>

        {/* Mute */}
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-3! py-2.5! text-left transition hover:bg-gray-50"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600">
            <BellOff size={17} />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-800">
              Mute notifications
            </p>
            <p className="text-xs text-gray-500">
              Stop notifications from this room
            </p>
          </div>
        </button>

        <div className="my-2! border-t border-gray-100" />

        {/* Clear Chat */}
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-3! py-2.5! text-left transition hover:bg-red-50"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
            <Trash2 size={17} />
          </div>
          <div>
            <p className="text-sm font-medium text-red-600">
              Clear conversation
            </p>
            <p className="text-xs text-gray-500">
              Remove messages from your view
            </p>
          </div>
        </button>

        {/* Leave Room */}
        <button
          onClick={() => setOpenLeaveModal(true)}
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-3! py-2.5! text-left transition hover:bg-red-50"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
            <LogOut size={17} />
          </div>

          <div>
            <p className="text-sm font-medium text-red-600">Leave room</p>
            <p className="text-xs text-gray-500">Leave this chat room</p>
          </div>
        </button>
      </div>
      <LeaveChatRoomModal
        room={room}
        open={openLeaveModal}
        onClose={() => setOpenLeaveModal(false)}
        // onConfirm={handleLeaveRoom}
      />
    </div>
  );
};

export default MessageSettings;
