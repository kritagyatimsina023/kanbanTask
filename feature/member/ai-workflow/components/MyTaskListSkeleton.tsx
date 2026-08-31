const MyTaskListSkeleton = () => {
  return (
    <div className="space-y-3!">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="rounded-xl border border-gray-200 bg-white p-5!"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="h-4 w-2/5 animate-pulse rounded bg-gray-200" />

              <div className="mt-2! h-3 w-3/4 animate-pulse rounded bg-gray-100" />
            </div>

            <div className="h-6 w-20 shrink-0 animate-pulse rounded-full bg-indigo-50" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyTaskListSkeleton;
