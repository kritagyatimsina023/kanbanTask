export default function MemberTaskOverviewSkeleton() {
  return (
    <section className="animate-pulse space-y-9!">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4! sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-200 bg-white p-5! shadow-sm"
          >
            <div className="flex items-center justify-between">
              {/* Title */}
              <div className="h-4 w-24 rounded bg-gray-200" />

              {/* Icon */}
              <div className="h-9 w-9 rounded-lg bg-gray-200" />
            </div>

            {/* Number */}
            <div className="mt-4! h-9 w-16 rounded bg-gray-200" />
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Task Status / Donut */}
        <div className="rounded-xl border border-gray-200 bg-white p-5! shadow-sm">
          <div>
            <div className="h-5 w-28 rounded bg-gray-200" />
            <div className="mt-2! h-3 w-52 rounded bg-gray-200" />
          </div>

          <div className="mt-4! grid grid-cols-1 items-center sm:grid-cols-2">
            {/* Donut */}
            <div className="flex h-[220px] items-center justify-center">
              <div className="relative h-[176px] w-[176px] rounded-full border-[22px] border-gray-200">
                {/* Center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="h-7 w-12 rounded bg-gray-200" />
                  <div className="mt-2! h-3 w-14 rounded bg-gray-200" />
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-4!">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-2.5! w-2.5! rounded-full bg-gray-200" />
                    <div className="h-4 w-20 rounded bg-gray-200" />
                  </div>

                  <div className="h-4 w-6 rounded bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Task Progress / Bar Chart */}
        <div className="rounded-xl border border-gray-200 bg-white p-5! shadow-sm">
          <div>
            <div className="h-5 w-28 rounded bg-gray-200" />
            <div className="mt-2! h-3 w-56 rounded bg-gray-200" />
          </div>

          <div className="mt-6! h-[250px]">
            <div className="flex h-full items-end justify-around px-8">
              {/* Bars */}
              <div className="h-[35%] w-12 rounded-t-md bg-gray-200" />
              <div className="h-[65%] w-12 rounded-t-md bg-gray-200" />
              <div className="h-[90%] w-12 rounded-t-md bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
