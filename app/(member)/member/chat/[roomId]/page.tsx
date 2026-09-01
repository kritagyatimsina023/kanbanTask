import ChatIdRoomSkeleton from "@/feature/member/chat/components/ChatIdRoomSekeleton";
import ChatMessageServer from "@/feature/member/chat/components/ChatMessageServer";
import { Suspense } from "react";
type props = {
  params: Promise<{
    roomId?: string;
  }>;
};

const ChatMessageHome = async ({ params }: props) => {
  const { roomId } = await params;

  return (
    <Suspense fallback={<ChatIdRoomSkeleton />}>
      <ChatMessageServer roomId={roomId} />
    </Suspense>
  );
};

export default ChatMessageHome;
