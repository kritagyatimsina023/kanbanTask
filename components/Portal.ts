"use client";

import { createPortal } from "react-dom";
import { ReactNode } from "react";

export default function Portal({ children }: { children: ReactNode }) {
  if (typeof document === "undefined") {
    return null;
  }

  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) {
    return null;
  }

  return createPortal(children, modalRoot);
}
