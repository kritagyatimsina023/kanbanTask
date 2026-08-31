"use client";
import { Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
const steps = [
  "Reading task details",
  "Analyzing task description",
  "Understanding task requirements",
  "Planning workflow steps",
  "Preparing your AI workflow",
];

const TaskLoading = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          return prev;
        }
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 px-4!">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8! shadow-sm">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50">
            <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
          </div>

          <h2 className="mt-4! text-lg font-semibold text-gray-900">
            Creating your AI workflow
          </h2>

          <p className="mt-1! text-sm text-gray-500">
            AI is analyzing your task and preparing a workflow.
          </p>
        </div>
        <div className="mt-8! space-y-4!">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;

            return (
              <div key={step} className="flex items-center gap-3">
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                    isCompleted || isCurrent ? "bg-indigo-50" : "bg-gray-50"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-3.5 w-3.5 text-indigo-600" />
                  ) : isCurrent ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-indigo-600" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                  )}
                </div>

                <span
                  className={`text-sm transition-colors duration-300 ${
                    isCompleted
                      ? "text-gray-500"
                      : isCurrent
                        ? "font-medium text-gray-900"
                        : "text-gray-400"
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-8! rounded-lg bg-gray-50 px-4! py-3!">
          <p className="text-center text-xs text-gray-500">
            This may take a few seconds...
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskLoading;
