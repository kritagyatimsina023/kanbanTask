import { Trophy } from "lucide-react";

export default function MemberPerformanceSkeleton() {
  return (
    <>
      <div className="mb-6! grid gap-4! md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 bg-white p-5! shadow-sm"
          >
            <div className="flex items-center gap-3!">
              <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-100"></div>
              <div className="space-y-2">
                <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
                <div className="h-6 w-12 animate-pulse rounded bg-gray-200"></div>
              </div>
            </div>
            <div className="mt-3! h-3 w-32 animate-pulse rounded bg-gray-100"></div>
          </div>
        ))}
      </div>
      <div className="mb-6! rounded-xl border border-gray-100 bg-gray-50/50 p-5!">
        <div className="mb-4! flex items-center gap-2!">
          <div className="h-5 w-5 animate-pulse rounded-full bg-gray-200"></div>
          <div className="h-5 w-24 animate-pulse rounded bg-gray-200"></div>
        </div>
        <div className="space-y-3!">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="rounded-lg border border-gray-100 bg-white p-4!"
            >
              <div className="h-5 w-1/3 animate-pulse rounded bg-gray-200"></div>
              <div className="mt-2! h-4 w-1/2 animate-pulse rounded bg-gray-100"></div>
              <div className="mt-3! h-3 w-24 animate-pulse rounded bg-gray-100"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
