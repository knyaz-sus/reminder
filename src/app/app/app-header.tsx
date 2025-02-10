"use client";

import { SidebarTrigger } from "@/components/sidebar/sidebar";
import { ViewOptions } from "./view-options";
import { useSidebar } from "@/hooks/use-sidebar";

export function AppHeader() {
  const { isOpen, isMobile } = useSidebar();

  return (
    <header className="flex fixed w-full justify-between h-[52px] z-[2] bg-background">
      {(!isOpen || isMobile) && <SidebarTrigger />}
      <div className="flex gap-4 items-center absolute right-6 top-3">
        <ViewOptions />
      </div>
    </header>
  );
}
