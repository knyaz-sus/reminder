"use client";

import { ReactNode } from "react";
import { createPortal } from "react-dom";

export function Portal({ children }: { children: ReactNode }) {
  if (typeof window !== undefined)
    return createPortal(
      children,
      document.querySelector("#portal") as HTMLDivElement
    );
}
