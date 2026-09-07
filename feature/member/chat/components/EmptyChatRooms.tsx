import { MessageCircle } from "lucide-react";

const EmptyChatRooms = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6! py-16! text-center">
      <div className="mb-4! flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
        <MessageCircle size={25} className="text-gray-400" />
      </div>

      <h3 className="text-sm font-semibold text-gray-800">No chat rooms yet</h3>

      <p className="mt-1! max-w-sm text-xs leading-relaxed text-gray-500">
        Create a chat room and invite other members to start a conversation.
      </p>
    </div>
  );
};

export default EmptyChatRooms;
