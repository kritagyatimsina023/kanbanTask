export default function TaskBoardSkeleton() {
  return (
    <div className="grid gap-6! md:grid-cols-2 xl:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex flex-col gap-4! rounded-xl bg-gray-50 p-4!">
          <div className="h-6 w-1/3 animate-pulse rounded bg-gray-200"></div>
          <div className="flex flex-col gap-3!">
            {[1, 2].map((j) => (
              <div
                key={j}
                className="h-24 animate-pulse rounded-lg border border-gray-100 bg-white shadow-sm"
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
