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

        {/* Development Status */}
        {/* <div className="mt-3! max-w-xl rounded-lg border border-amber-100 bg-amber-50/50 px-3! py-2.5!">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-medium text-gray-700">
              Production Readiness
            </p>

            <span className="text-[11px] font-semibold text-amber-600">
              75%
            </span>
          </div>

          <div className="mt-1.5! h-1.5 w-full overflow-hidden rounded-full bg-amber-100">
            <div
              className="h-full rounded-full bg-amber-500 transition-all"
              style={{ width: "95%" }}
            />
          </div>

          <p className="mt-1.5! text-[11px] leading-relaxed text-gray-500">
            Chat messaging, room management, member removal, leaving rooms, and
            emoji support are implemented. Real-time messaging is not
            implemented yet, so messages are not automatically delivered to
            other connected members.
          </p>
        </div> */}
      </div>
      <Suspense fallback={<ChatHomeSkeleton />}>
        <ChatServerMain />
      </Suspense>
    </section>
  );
};

export default ChatRoom;
