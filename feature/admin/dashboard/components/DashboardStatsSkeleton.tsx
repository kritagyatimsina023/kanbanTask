const DashboardStatsSkeleton = () => {
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="rounded-xl border border-gray-200 bg-white p-5! shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

                <div className="mt-2! h-9 w-16 animate-pulse rounded bg-gray-200" />

                <div className="mt-2! h-3 w-28 animate-pulse rounded bg-gray-100" />
              </div>

              <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-100" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8! grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6! shadow-sm">
          <div className="mb-5!">
            <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />

            <div className="mt-2! h-4 w-64 animate-pulse rounded bg-gray-100" />
          </div>

          <div className="space-y-5!">
            <div>
              <div className="mb-2! flex items-center justify-between">
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-8 animate-pulse rounded bg-gray-200" />
              </div>

              <div className="h-2! animate-pulse overflow-hidden rounded-full bg-gray-100" />
            </div>

            <div>
              <div className="mb-2! flex items-center justify-between">
                <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-8 animate-pulse rounded bg-gray-200" />
              </div>

              <div className="h-2! animate-pulse overflow-hidden rounded-full bg-gray-100" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6! shadow-sm">
          <div className="mb-5!">
            <div className="h-5 w-40 animate-pulse rounded bg-gray-200" />

            <div className="mt-2! h-4 w-56 animate-pulse rounded bg-gray-100" />
          </div>

          <div className="grid grid-cols-2 gap-4!">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="rounded-lg bg-gray-50 p-4!">
                <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />

                <div className="mt-2! h-7 w-12 animate-pulse rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8! rounded-xl border border-gray-200 bg-white p-6! shadow-sm">
        <div className="mb-5!">
          <div className="h-5 w-36 animate-pulse rounded bg-gray-200" />
          <div className="mt-2! h-4 w-64 animate-pulse rounded bg-gray-100" />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="rounded-lg bg-gray-50 p-4!">
              <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
              <div className="mt-2! h-7 w-12 animate-pulse rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DashboardStatsSkeleton;
