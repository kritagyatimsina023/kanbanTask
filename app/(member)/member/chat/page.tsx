import ChatHomeSkeleton from "@/feature/member/chat/components/ChatHomeSkeleton";
import ChatServerMain from "@/feature/member/chat/components/ChatServerMain";

import { Suspense } from "react";

const ChatRoom = async () => {
  return (
    <section className="">
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">Chat Rooms</h1>
          <span className="rounded-full bg-amber-50 px-2.5! py-1! text-[11px] font-medium text-amber-600">
            In Development
          </span>
        </div>

        <p className="mt-1! text-sm text-gray-500">
          Connect and communicate with other members.
        </p>
      </div>
      <Suspense fallback={<ChatHomeSkeleton />}>
        <ChatServerMain />
      </Suspense>
    </section>
  );
};

export default ChatRoom;
