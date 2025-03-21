import { Context, use } from "react";

export const useContextTyped = <T>(context: Context<T>) => {
  const value = use<T>(context);
  if (!value) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return value;
};
