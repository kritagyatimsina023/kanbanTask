const ChatHomeSkeleton = () => {
  return (
    <section className="space-y-6! animate-pulse">
      {/* Create Room Button */}
      <div className="flex w-full justify-end">
        <div className="h-10 w-32 rounded-lg bg-gray-200" />
      </div>

      {/* Chat Rooms Card */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-gray-100 px-5! py-4!">
          <div className="h-4 w-28 rounded bg-gray-200" />

          <div className="mt-2! h-3 w-36 rounded bg-gray-100" />
        </div>

        {/* Room List */}
        <div className="divide-y divide-gray-100">
          {/* Room 1 */}
          <ChatRoomSkeletonItem />

          {/* Room 2 */}
          <ChatRoomSkeletonItem />

          {/* Room 3 */}
          <ChatRoomSkeletonItem />

          {/* Room 4 */}
          <ChatRoomSkeletonItem />
        </div>
      </div>
    </section>
  );
};

const ChatRoomSkeletonItem = () => {
  return (
    <div className="flex w-full items-center gap-4 px-5! py-4!">
      {/* Avatar */}
      <div className="h-11 w-11 shrink-0 rounded-full bg-gray-200" />

      {/* Room Information */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          {/* Room name */}
          <div className="h-4 w-36 rounded bg-gray-200" />

          {/* Date */}
          <div className="h-3 w-16 shrink-0 rounded bg-gray-100" />
        </div>

        {/* Created by */}
        <div className="mt-2! h-3 w-48 rounded bg-gray-100" />

        {/* Chat room label */}
        <div className="mt-3! h-3 w-20 rounded bg-gray-100" />
      </div>

      {/* Delete button */}
      <div className="h-9 w-9 shrink-0 rounded-lg bg-gray-100" />
    </div>
  );
};

export default ChatHomeSkeleton;
