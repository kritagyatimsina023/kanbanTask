import { ChatRoomService } from "@/feature/member/chat/chatRoom.service";
import ChatHome from "@/feature/member/chat/components/ChatHome";
import { memberService } from "@/feature/member/member.service";
import { requireAuth } from "@/lib/auth";

const ChatRoom = async () => {
  const session = await requireAuth();
  const member = await memberService.getAllMembers();
  const chatRoom = await ChatRoomService.getChatRooms(session.id);

  return (
    <>
      <ChatHome currentUserId={session.id} rooms={chatRoom} members={member} />
    </>
  );
};

export default ChatRoom;
