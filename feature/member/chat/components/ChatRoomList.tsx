"use client";

import { RoomType } from "@/app/types/chartRoom.types";
import EmptyChatRooms from "./EmptyChatRooms";
import ChatRoomItem from "./ChatRoomItem";

type Props = {
  rooms: RoomType[];
  currentUserId: string;
  onOpenRoom: (roomId: string) => void;
};

const ChatRoomList = ({ rooms, currentUserId, onOpenRoom }: Props) => {
  if (rooms.length === 0) {
    return <EmptyChatRooms />;
  }

  return (
    <div className="divide-y divide-gray-100">
      {rooms.map((room) => (
        <ChatRoomItem
          key={room.id}
          room={room}
          currentUserId={currentUserId}
          onOpenRoom={onOpenRoom}
        />
      ))}
    </div>
  );
};

export default ChatRoomList;
