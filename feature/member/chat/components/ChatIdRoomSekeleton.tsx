const ChatIdRoomSkeleton = () => {
  return (
    <section className="flex h-[calc(100vh-2rem)] min-h-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm animate-pulse">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-5! py-4!">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="h-10 w-10 rounded-full bg-gray-200" />

          <div className="space-y-2">
            {/* Room name */}
            <div className="h-4 w-32 rounded bg-gray-200" />

            {/* Member count */}
            <div className="h-3 w-20 rounded bg-gray-100" />
          </div>
        </div>

        {/* Header actions */}
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-gray-100" />
          <div className="h-9 w-9 rounded-lg bg-gray-100" />
        </div>
      </div>

      {/* Messages */}
      <div className="min-h-0 flex-1 overflow-hidden px-5! py-5!">
        <div className="flex h-full flex-col justify-end gap-5">
          {/* Received message */}
          <div className="flex items-end gap-2">
            <div className="h-8 w-8 shrink-0 rounded-full bg-gray-200" />

            <div className="max-w-[65%] space-y-2">
              <div className="h-3 w-20 rounded bg-gray-100" />
              <div className="h-10 w-56 rounded-2xl bg-gray-100" />
            </div>
          </div>

          {/* Sent message */}
          <div className="flex justify-end">
            <div className="max-w-[65%] space-y-2">
              <div className="ml-auto h-10 w-48 rounded-2xl bg-gray-200" />
            </div>
          </div>

          {/* Received message */}
          <div className="flex items-end gap-2">
            <div className="h-8 w-8 shrink-0 rounded-full bg-gray-200" />

            <div className="max-w-[65%] space-y-2">
              <div className="h-3 w-24 rounded bg-gray-100" />
              <div className="h-12 w-72 rounded-2xl bg-gray-100" />
            </div>
          </div>

          {/* Sent message */}
          <div className="flex justify-end">
            <div className="h-10 w-64 rounded-2xl bg-gray-200" />
          </div>

          {/* Received message */}
          <div className="flex items-end gap-2">
            <div className="h-8 w-8 shrink-0 rounded-full bg-gray-200" />

            <div className="max-w-[65%]">
              <div className="h-10 w-40 rounded-2xl bg-gray-100" />
            </div>
          </div>

          {/* Sent message */}
          <div className="flex justify-end">
            <div className="h-12 w-52 rounded-2xl bg-gray-200" />
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="shrink-0 border-t border-gray-200 px-5! py-4!">
        <div className="flex items-center gap-3">
          {/* Emoji button */}
          <div className="h-10 w-10 shrink-0 rounded-lg bg-gray-100" />

          {/* Input */}
          <div className="h-10 flex-1 rounded-lg bg-gray-100" />

          {/* Send button */}
          <div className="h-10 w-20 shrink-0 rounded-lg bg-gray-200" />
        </div>
      </div>
    </section>
  );
};

export default ChatIdRoomSkeleton;
