"use client";

import { useLinkStatus } from "next/link";
import { PropsWithChildren } from "react";

export function LinkLoader({ children }: PropsWithChildren) {
  const { pending } = useLinkStatus();
  return pending && children;
}
