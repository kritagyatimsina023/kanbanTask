"use client";

import { MessageCircle, Plus, Trash2, Users } from "lucide-react";
import { useMemo, useState } from "react";
import CreateRoom from "./CreateRoom";
import { useRouter } from "next/navigation";

import { Member } from "@/app/types/member.types";
import { ChatRoom } from "@/generated/prisma/browser";
import { deleteChatRoom } from "../chatRoom.action";
import { toast } from "sonner";
import { RoomType } from "@/app/types/chartRoom.types";
import { formatNepalDate } from "@/lib/helper";

type ChatHomeProps = {
  members: Member[];
  rooms: RoomType[];
  currentUserId: string;
};

const ChatHome = (props: ChatHomeProps) => {
  const router = useRouter();
  const { members, rooms, currentUserId } = props;
  const [createRoom, setCreateRoom] = useState(false);

  const handleCreateRoom = () => {
    setCreateRoom(true);
  };
  const handleOpenRoom = (roomId: string) => {
    router.push(`/member/chat/${roomId}`);
  };
  const handleDeleteRoom = async (room: ChatRoom) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this chat room (${room.name}) ?`,
    );
    if (!confirmed) return;
    const result = await deleteChatRoom(room.id);
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    toast.success(result.message);
    router.refresh();
  };
  const filteredMembers = useMemo(
    () => members.filter((member) => member.id !== currentUserId),
    [members, currentUserId],
  );

  return (
    <section className="space-y-6!">
      <div className="w-full flex justify-end">
        <button
          type="button"
          onClick={handleCreateRoom}
          className="inline-flex  h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4! text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          <Plus size={17} strokeWidth={2.2} />
          Create Room
        </button>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-5! py-4!">
          <h2 className="text-sm font-semibold text-gray-900">
            Your Chat Rooms
          </h2>

          <p className="mt-1! text-xs text-gray-500">
            {rooms.length} room
            {rooms.length !== 1 ? "s" : ""} available
          </p>
        </div>

        <div className="divide-y divide-gray-100">
          {rooms.length > 0 ? (
            rooms.map((room) => {
              return (
                <div
                  key={room.id}
                  className="group flex w-full items-center gap-4 px-5! py-4! transition hover:bg-gray-50"
                >
                  <button
                    type="button"
                    onClick={() => handleOpenRoom(room.id)}
                    className="flex min-w-0 flex-1 items-center gap-4 text-left"
                  >
                    {/* Avatar */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                      <MessageCircle size={21} strokeWidth={2} />
                    </div>

                    {/* Room Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="truncate text-sm font-semibold text-gray-900">
                          {room.name}
                        </h3>

                        <span className="shrink-0 text-[11px] text-gray-400">
                          {formatNepalDate(room.updatedAt)}
                        </span>
                      </div>

                      <div className="mt-1">
                        <p className="truncate text-xs text-gray-500">
                          Created by {room.createdBy?.email}
                        </p>
                      </div>

                      <div className="mt-2 flex items-center gap-1.5 text-[11px] text-gray-400">
                        <Users size={13} />
                        <span>Chat room</span>
                      </div>
                    </div>
                  </button>

                  {/* Delete */}

                  {room.createdById === currentUserId && (
                    <button
                      type="button"
                      onClick={() => handleDeleteRoom(room)}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 opacity-0 transition hover:bg-red-50 hover:text-red-600 group-hover:opacity-100"
                      aria-label={`Delete ${room.name}`}
                      title="Delete room"
                    >
                      <Trash2 size={17} />
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <EmptyChatRooms onCreateRoom={handleCreateRoom} />
          )}
        </div>
      </div>
      {createRoom && (
        <CreateRoom
          members={filteredMembers}
          onClose={() => setCreateRoom(false)}
        />
      )}
    </section>
  );
};

type EmptyChatRoomsProps = {
  onCreateRoom: () => void;
};

const EmptyChatRooms = ({ onCreateRoom }: EmptyChatRoomsProps) => {
  return (
    <div className="flex flex-col items-center justify-center px-6! py-16! text-center">
      <div className="mb-4! flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
        <MessageCircle size={25} className="text-gray-400" />
      </div>

      <h3 className="text-sm font-semibold text-gray-800">No chat rooms yet</h3>

      <p className="mt-1! max-w-sm text-xs leading-relaxed text-gray-500">
        Create a chat room and invite other members to start a conversation.
      </p>

      <button
        type="button"
        onClick={onCreateRoom}
        className="mt-5! inline-flex h-9 items-center gap-2 rounded-lg bg-indigo-600 px-4! text-xs font-medium text-white transition hover:bg-indigo-700"
      >
        <Plus size={15} />
        Create Room
      </button>
    </div>
  );
};

export default ChatHome;
