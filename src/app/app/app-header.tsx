"use client";

import { SidebarTrigger } from "@/components/sidebar/sidebar";
import { ViewOptions } from "./view-options";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/cn";

export function AppHeader() {
  const { isOpen, isMobile } = useSidebar();
  return (
    <header className="flex fixed w-full justify-between h-[52px] z-[2] bg-background">
      <SidebarTrigger
        className={cn(
          "absolute left-[1.5rem] top-3  ease-linear duration-200",
          {
            "left-[17.5rem]": isOpen && !isMobile,

            "transition-all": !isMobile,
          }
        )}
      />
      <div className="flex gap-4 items-center absolute right-6 top-3">
        <ViewOptions />
      </div>
    </header>
  );
}
