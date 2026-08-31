import MyTaskData from "@/feature/member/ai-workflow/components/MyTaskData";

import MyTaskListSkeleton from "@/feature/member/ai-workflow/components/MyTaskListSkeleton";

import { Suspense } from "react";

const AIHome = async () => {
  return (
    <div className="space-y-6!">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Workflow</h1>
        <p className="mt-1! text-sm text-gray-500">
          Select a task to generate an AI workflow.
        </p>
        <p className="mt-1! text-xs text-amber-600">
          {" "}
          Note: AI functionality is currently a dummy implementation. AI API
          integration is not available yet.{" "}
        </p>
      </div>
      <Suspense fallback={<MyTaskListSkeleton />}>
        <MyTaskData />
      </Suspense>
    </div>
  );
};

export default AIHome;
