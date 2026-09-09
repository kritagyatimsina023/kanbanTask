import React from "react";
import { Construction } from "lucide-react";

const RealTimeUnderDevelopment = () => {
  return (
    <div className="flex min-h-[10vh] items-start justify-start px-6!">
      <div className="w-full max-w-lg rounded-2xl border border-neutral-200 bg-white px-6! py-5! text-center shadow-sm transition-shadow hover:shadow-md">
        <h1 className="text-xl font-bold tracking-tight text-neutral-900">
          Real-Time Features
        </h1>

        <div className="mx-auto mt-4! flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4! py-2! text-xs font-medium text-amber-700 shadow-sm">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-amber-500" />
          </span>

          <Construction className="size-3.5" />
          <span>Under Development</span>
        </div>

        <div className="mx-auto mt-6! max-w-sm">
          <div className="mb-2! flex items-center justify-between text-[11px] font-medium text-neutral-400">
            <span>Development progress</span>
            <span>Coming soon</span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-neutral-100">
            <div className="h-full w-2/3 rounded-full bg-neutral-800 transition-all duration-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeUnderDevelopment;
