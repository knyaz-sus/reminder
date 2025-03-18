import { Suspense } from "react";
import { Sidebar, SidebarContent, SidebarFooter } from "./sidebar";
import { SidebarRoutes } from "./sidebar-routes";
import { ThemeToggle } from "@/components/theme-toggle";
import { SidebarUserStreaming } from "./sidebar-user-streaming";
import { SidebarProjectsStreaming } from "./sidebar-projects-streaming";
import { SidebarUserMenuSkeleton } from "./sidebar-user-menu-skeleton";
import { SidebarProjectsSkeleton } from "./sidebar-projects-skeleton";

export async function AppSidebar() {
  return (
    <Sidebar>
      <Suspense fallback={<SidebarUserMenuSkeleton />}>
        <SidebarUserStreaming />
      </Suspense>
      <SidebarContent>
        <SidebarRoutes />
        <Suspense fallback={<SidebarProjectsSkeleton />}>
          <SidebarProjectsStreaming />
        </Suspense>
      </SidebarContent>
      <SidebarFooter>
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
