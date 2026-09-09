import CommonLoader from "@/components/CommonLoader";
import RealTimeUnderDevelopment from "@/components/RealTimeUnderDevelopment";

import ActivityData from "@/feature/admin/activityLog/ActivityData";

import { Suspense } from "react";

const ActivityHome = async () => {
  return (
    <div className="relative grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_auto]">
      {/* Left side */}
      <div className="min-w-0">
        <div className="mt-4!">
          <h1 className="text-2xl font-bold text-neutral-900">Activity</h1>

          <p className="mt-1 text-sm text-neutral-500">
            Recent activity related to your tasks and work.
          </p>
        </div>

        <div className="my-8!">
          <Suspense fallback={<CommonLoader />}>
            <ActivityData />
          </Suspense>
        </div>
      </div>

      {/* Right side */}
      <div className="sticky top-18 z-50 self-start">
        <RealTimeUnderDevelopment />
      </div>
    </div>
  );
};

export default ActivityHome;
