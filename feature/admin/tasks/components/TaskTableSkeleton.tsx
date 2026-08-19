const TaskTableSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-6! py-5!">
        <div className="flex items-center justify-between gap-4!">
          <div>
            <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />

            <div className="mt-2! h-4 w-72 animate-pulse rounded bg-gray-100" />
          </div>

          <div className="flex items-center gap-2! rounded-lg bg-gray-50 px-3! py-2!">
            <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />

            <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1050px]">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/70">
              {[
                "Task",
                "Assignee",
                "Status",
                "Created",
                "Updated",
                "Deadline",
              ].map((header) => (
                <th
                  key={header}
                  className="px-5! py-4! text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index}>
                <td className="px-5! py-4!">
                  <div className="max-w-[280px] space-y-2">
                    <div className="h-4 w-44 animate-pulse rounded bg-gray-200" />
                    <div className="h-3 w-60 animate-pulse rounded bg-gray-100" />
                  </div>
                </td>

                <td className="px-5! py-4!">
                  <div className="flex items-center gap-2!">
                    <div className="h-8 w-8 shrink-0 animate-pulse rounded-full bg-gray-200" />

                    <div className="min-w-0 space-y-2">
                      <div className="h-3.5 w-28 animate-pulse rounded bg-gray-200" />
                      <div className="h-3 w-14 animate-pulse rounded bg-gray-100" />
                    </div>
                  </div>
                </td>

                <td className="px-5! py-4!">
                  <div className="h-6 w-24 animate-pulse rounded-full bg-gray-200" />
                </td>

                <td className="px-5! py-4!">
                  <div className="flex items-center gap-2!">
                    <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-24 animate-pulse rounded bg-gray-100" />
                  </div>
                </td>

                <td className="px-5! py-4!">
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-100" />
                </td>

                <td className="px-5! py-4!">
                  <div className="flex items-center gap-2!">
                    <div className="h-4 w-4 shrink-0 animate-pulse rounded bg-gray-200" />

                    <div className="space-y-2">
                      <div className="h-3.5 w-24 animate-pulse rounded bg-gray-200" />
                      <div className="h-3 w-16 animate-pulse rounded bg-gray-100" />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50/50 px-6! py-3!">
        <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

        <div className="flex items-center gap-2!">
          <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-200" />
          <div className="h-9 w-20 animate-pulse rounded-lg bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default TaskTableSkeleton;
