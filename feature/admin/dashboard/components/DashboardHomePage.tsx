import { requireAuth } from "@/lib/auth";

import { Suspense } from "react";
import DashboardStatsSkeleton from "./DashboardStatsSkeleton";
import DashboardStats from "./DashboardStats";

const DashboardHomePage = async () => {
  const session = await requireAuth();
  return (
    <div>
      <div className="mb-8!">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>

        <p className="mt-2! text-sm text-gray-600">
          Welcome back, {session.email}. Here is an overview of the application.
        </p>
      </div>
      <Suspense fallback={<DashboardStatsSkeleton />}>
        <DashboardStats />
      </Suspense>
    </div>
  );
};

export default DashboardHomePage;
