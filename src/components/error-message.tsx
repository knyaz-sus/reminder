import { ReactNode } from "react";

export function ErrorSpan({ children }: { children: ReactNode }) {
  return <span className="text-sm text-red-400 p-1">{children}</span>;
}
