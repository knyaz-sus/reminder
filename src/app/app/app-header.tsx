import { SidebarTrigger } from "@/components/sidebar/sidebar";
import { ViewOptions } from "./view-options";

export function AppHeader() {
  return (
    <header className="flex items-center fixed w-full justify-between h-[52px] z-[2] bg-background px-4">
      <SidebarTrigger />
      <ViewOptions />
    </header>
  );
}
