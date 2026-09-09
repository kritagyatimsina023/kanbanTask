import CommonLoader from "@/components/CommonLoader";
import RealTimeUnderDevelopment from "@/components/RealTimeUnderDevelopment";

import ActivityData from "@/feature/activitylog/components/ActivityData";

import { Suspense } from "react";

const ActivityHome = async () => {
  // const activity = await activityService.getAllActivity();
  // console.log("Activity", activity);
  return (
    <div>
      <div className="flex items-center justify-between border-b border-neutral-200 px-6! py-5!">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-neutral-900">
              Activity Log
            </h2>

            {/* Live indicator */}
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
          </div>
          <p className="mt-1! text-sm text-neutral-500">
            Recent activity across the system
          </p>
        </div>
        <RealTimeUnderDevelopment />
      </div>
      <Suspense fallback={<CommonLoader />}>
        <ActivityData />
      </Suspense>
    </div>
  );
};

export default ActivityHome;
