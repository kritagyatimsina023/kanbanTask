const UsersTableSkeleton = () => {
  const rows = Array.from({ length: 6 });

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 px-6! py-4!">
        <div>
          <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />

          <div className="mt-2! h-4 w-32 animate-pulse rounded bg-gray-100" />
        </div>

        <div className="h-9 w-9 animate-pulse rounded-lg bg-gray-100" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6! py-3! text-left">
                <div className="h-3 w-12 animate-pulse rounded bg-gray-200" />
              </th>

              <th className="px-4! py-3! text-left">
                <div className="h-3 w-10 animate-pulse rounded bg-gray-200" />
              </th>

              <th className="px-4! py-3! text-center">
                <div className="mx-auto h-3 w-12 animate-pulse rounded bg-gray-200" />
              </th>

              <th className="px-4! py-3! text-center">
                <div className="mx-auto h-3 w-20 animate-pulse rounded bg-gray-200" />
              </th>

              <th className="px-4! py-3! text-center">
                <div className="mx-auto h-3 w-16 animate-pulse rounded bg-gray-200" />
              </th>

              <th className="px-4! py-3! text-center">
                <div className="mx-auto h-3 w-14 animate-pulse rounded bg-gray-200" />
              </th>

              <th className="px-6! py-3! text-right">
                <div className="ml-auto h-3 w-12 animate-pulse rounded bg-gray-200" />
              </th>
            </tr>
          </thead>

          <tbody className="divide-y! divide-gray-100">
            {rows.map((_, index) => (
              <tr key={index}>
                <td className="px-6! py-4!">
                  <div className="flex items-center gap-3!">
                    <div className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-gray-200" />

                    <div>
                      <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />

                      <div className="mt-2! h-3 w-24 animate-pulse rounded bg-gray-100" />
                    </div>
                  </div>
                </td>

                <td className="px-4! py-4!">
                  <div className="h-6 w-16 animate-pulse rounded-full bg-gray-100" />
                </td>

                <td className="px-4! py-4! text-center">
                  <div className="mx-auto h-4 w-6 animate-pulse rounded bg-gray-200" />
                </td>

                <td className="px-4! py-4! text-center">
                  <div className="mx-auto h-4 w-6 animate-pulse rounded bg-gray-200" />
                </td>

                <td className="px-4! py-4! text-center">
                  <div className="mx-auto h-4 w-6 animate-pulse rounded bg-gray-200" />
                </td>

                <td className="px-4! py-4! text-center">
                  <div className="mx-auto h-6 w-16 animate-pulse rounded-full bg-gray-100" />
                </td>

                <td className="px-6! py-4! text-right">
                  <div className="ml-auto h-9 w-16 animate-pulse rounded-lg bg-gray-100" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTableSkeleton;
