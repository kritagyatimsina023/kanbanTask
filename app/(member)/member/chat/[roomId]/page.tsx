import { ChatMessageService } from "@/feature/member/chat/chatMessage.service";
import ChatIdRoom from "@/feature/member/chat/components/ChatIdRoom";

import { requireAuth } from "@/lib/auth";
import React from "react";
type props = {
  params: Promise<{
    roomId?: string;
  }>;
};

const ChatMessageHome = async ({ params }: props) => {
  const session = await requireAuth();
  const { roomId } = await params;

  if (!roomId) {
    return <div>Chat room not found</div>;
  }
  const [room, messages] = await Promise.all([
    ChatMessageService.getChatRoom(roomId, session.id),
    ChatMessageService.getRoomMessages(roomId, session.id),
  ]);

  return (
    <>
      <ChatIdRoom room={room} messages={messages} currentUserId={session.id} />
    </>
  );
};

export default ChatMessageHome;
