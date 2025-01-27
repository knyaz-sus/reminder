import { SidebarContext } from "../context/sidebar-provider";
import { useContextTyped } from "./use-context-typed";

export const useSidebar = () => useContextTyped(SidebarContext);
