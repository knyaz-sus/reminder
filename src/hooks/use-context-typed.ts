import { Context, useContext } from "react";

export const useContextTyped = <T>(context: Context<T>) => {
  const value = useContext<T>(context);
  if (!value) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return value;
};
