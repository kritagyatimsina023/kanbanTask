import React from "react";
import {
  Activity,
  Bell,
  CheckCircle2,
  CircleDot,
  Construction,
  MessageCircle,
  Radio,
  Users,
} from "lucide-react";

const RealTimeUnderDevelopment = () => {
  const features = [
    {
      icon: Bell,
      label: "Live notifications",
      completed: true,
    },
    {
      icon: MessageCircle,
      label: "Real-time messaging",
      completed: true,
    },
    {
      icon: Activity,
      label: "Live activity updates",
      completed: false,
    },
    {
      icon: Users,
      label: "Online presence",
      completed: false,
    },
    {
      icon: CheckCircle2,
      label: "Instant task updates",
      completed: true,
    },
  ];

  const completedCount = features.filter((feature) => feature.completed).length;

  const progress = Math.round((completedCount / features.length) * 100);

  return (
    <div className="flex items-start justify-start px-6!">
      <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white px-6! py-6! shadow-sm transition-shadow hover:shadow-md">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Radio className="size-5 text-neutral-800" />

              <h1 className="text-lg font-bold tracking-tight text-neutral-900">
                Real-Time Features
              </h1>
            </div>

            <p className="mt-2 text-xs leading-5 text-neutral-500">
              Real-time communication and live updates are being progressively
              implemented.
            </p>
          </div>

          <span className="relative mt-1 flex size-2.5 shrink-0">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-amber-500" />
          </span>
        </div>

        {/* Status */}
        <div className="mt-5! flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3! py-2.5!">
          <Construction className="size-4 text-amber-600" />

          <div>
            <p className="text-xs font-semibold text-amber-800">
              Under Development
            </p>

            <p className="mt-0.5 text-[10px] text-amber-600">
              {completedCount} of {features.length} features completed
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-6!">
          <div className="mb-3! flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-700">
              Real-Time Features
            </span>

            <span className="text-[10px] font-medium text-neutral-400">
              {completedCount}/{features.length}
            </span>
          </div>

          <div className="space-y-2!">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.label}
                  className="flex items-center gap-3 rounded-lg px-2! py-2! transition-colors hover:bg-neutral-50"
                >
                  <div
                    className={`flex size-7! shrink-0 items-center justify-center rounded-lg ${
                      feature.completed ? "bg-neutral-900" : "bg-neutral-100"
                    }`}
                  >
                    <Icon
                      className={`size-3.5 ${
                        feature.completed ? "text-white" : "text-neutral-500"
                      }`}
                    />
                  </div>

                  <span
                    className={`text-xs font-medium ${
                      feature.completed
                        ? "text-neutral-800"
                        : "text-neutral-500"
                    }`}
                  >
                    {feature.label}
                  </span>

                  {feature.completed ? (
                    <CheckCircle2 className="ml-auto size-4 text-neutral-800" />
                  ) : (
                    <CircleDot className="ml-auto size-3 text-neutral-300" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress */}
        <div className="mt-6! border-t border-neutral-100 pt-5!">
          <div className="mb-2! flex items-center justify-between">
            <span className="text-[11px] font-medium text-neutral-400">
              Development progress
            </span>

            <span className="text-[11px] font-semibold text-neutral-700">
              {progress}%
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-neutral-100">
            <div
              className="h-full rounded-full bg-neutral-800 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-2 text-[10px] text-neutral-400">
            {features.length - completedCount === 0
              ? "All real-time features are complete."
              : `${features.length - completedCount} features remaining.`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RealTimeUnderDevelopment;
