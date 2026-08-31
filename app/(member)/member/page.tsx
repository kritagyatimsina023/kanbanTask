import { requireAuth } from "@/lib/auth";

import MemberDataPage from "@/feature/member/_components/MemberDataPage";

export default async function DashboardPage() {
  const session = await requireAuth();
  if (!session) return null;
  return (
    <section className="relative ">
      <div className="space-y-6!">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            My Task Overview
          </h2>
          <p className="mt-1! text-sm text-gray-500">
            Track your task progress and productivity.
          </p>
        </div>
        <MemberDataPage />
      </div>
    </section>
  );
}
