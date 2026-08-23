"use client";

import ErrorFallback from "@/components/errors/ErrorFallback";

type ErrorProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <ErrorFallback
      error={error}
      reset={reset}
      title="Unable to load tasks"
      message="Something went wrong while loading the task board. Please try again."
    />
  );
}
