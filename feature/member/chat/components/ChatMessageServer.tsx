import { ChatMessageService } from "@/feature/member/chat/chatMessage.service";
import ChatIdRoom from "@/feature/member/chat/components/ChatIdRoom";
import { requireAuth } from "@/lib/auth";

type props = {
  roomId: string | undefined;
};

const ChatMessageServer = async ({ roomId }: props) => {
  const session = await requireAuth();
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

export default ChatMessageServer;
