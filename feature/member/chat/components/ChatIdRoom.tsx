import { messages, Room } from "@/app/types/chatMessage.types";
import ChatMessageHeader from "./ChatMessageHeader";
import ChatMessages from "./ChatMessages";
import MessageInput from "./MessageInput";

type props = {
  room: Room;
  messages: messages[];
  currentUserId: string;
};

const ChatIdRoom = ({ room, messages, currentUserId }: props) => {
  return (
    <section className="flex h-[calc(100vh-2rem)] min-h-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <ChatMessageHeader room={room} />

      <ChatMessages currentUserId={currentUserId} messages={messages} />

      <MessageInput room={room} />
    </section>
  );
};

export default ChatIdRoom;
