"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollTriggerRefresher() {
  useEffect(() => {
    // Wait for all images/fonts/layout to settle, then recalc every trigger
    const refresh = () => ScrollTrigger.refresh();

    window.addEventListener("load", refresh);

    // Also refresh shortly after mount, in case "load" already fired
    const timeout = setTimeout(refresh, 300);

    return () => {
      window.removeEventListener("load", refresh);
      clearTimeout(timeout);
    };
  }, []);

  return null;
}
