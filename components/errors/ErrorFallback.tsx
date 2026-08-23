"use client";

import { useEffect } from "react";

type ErrorFallbackProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
  title?: string;
  message?: string;
};

const ErrorFallback = ({
  error,
  reset,
  title = "Something went wrong",
  message = "Something went wrong. Please try again.",
}: ErrorFallbackProps) => {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center px-6! text-center">
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      <p className="mt-2! text-sm text-gray-500">{message}</p>
      <p className="mt-2! text-sm text-gray-500">{error?.message}</p>
      <button
        onClick={reset}
        className="mt-5! rounded-lg bg-indigo-600 px-5! py-2.5! text-sm font-medium text-white transition hover:bg-indigo-700"
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorFallback;
