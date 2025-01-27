import { Sidebar, SidebarContent, SidebarFooter } from "./sidebar";
import { SidebarRoutes } from "./sidebar-routes";
import { SidebarProjects } from "./sidebar-projects";
import { SidebarUserMenu } from "./sidebar-user-menu";
import { ThemeToggle } from "@/components/theme-toggle";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarUserMenu />
      <SidebarContent>
        <SidebarRoutes />
        <SidebarProjects />
      </SidebarContent>
      <SidebarFooter>
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
