"use client";

import { useEffect, useRef } from "react";

export const useScrollToBottom = <T>(dependency: T) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [dependency]);

  return containerRef;
};
