import { Suspense } from "react";
import { Sidebar, SidebarContent, SidebarFooter } from "./sidebar";
import { SidebarRoutes } from "./sidebar-routes";
import { ThemeToggle } from "@/components/theme-toggle";
import { SidebarUserMenuSkeleton } from "./sidebar-user-menu-skeleton";
import { SidebarProjectsSkeleton } from "./sidebar-projects-skeleton";
import { SidebarProjects } from "./sidebar-projects";
import { SidebarUserMenu } from "./sidebar-user-menu";

export function AppSidebar() {
  return (
    <Sidebar>
      <Suspense fallback={<SidebarUserMenuSkeleton />}>
        <SidebarUserMenu />
      </Suspense>
      <SidebarContent>
        <SidebarRoutes />
        <Suspense fallback={<SidebarProjectsSkeleton />}>
          <SidebarProjects />
        </Suspense>
      </SidebarContent>
      <SidebarFooter>
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
