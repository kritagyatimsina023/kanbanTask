import React from "react";
import ChatHome from "./ChatHome";
import { memberService } from "../../member.service";
import { ChatRoomService } from "../chatRoom.service";
import { requireAuth } from "@/lib/auth";

const ChatServerMain = async () => {
  const session = await requireAuth();
  const member = await memberService.getAllMembers();
  const chatRoom = await ChatRoomService.getChatRooms(session.id);

  return (
    <ChatHome currentUserId={session.id} rooms={chatRoom} members={member} />
  );
};

export default ChatServerMain;
