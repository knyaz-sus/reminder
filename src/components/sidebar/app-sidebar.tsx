import { Sidebar, SidebarContent, SidebarFooter } from "./sidebar";
import { SidebarProjects } from "./sidebar-projects";
import { SidebarRoutes } from "./sidebar-routes";
import { SidebarUserMenu } from "./sidebar-user-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import { QueryClient } from "@tanstack/react-query";
import { projectQueryOptions } from "@/modules/project/api/project-query-options";
import { redirect } from "next/navigation";

export async function AppSidebar() {
  const supabase = await createServerSupabase();
  const user = await supabase.auth.getUser();
  if (!user) {
    redirect("/auth");
  }

  const queryClient = new QueryClient();
  const projects = await queryClient.fetchQuery(
    projectQueryOptions.getAllProjectsQueryOptions(user.data.user?.id, supabase)
  );

  return (
    <Sidebar>
      <SidebarUserMenu />
      <SidebarContent>
        <SidebarRoutes />
        <SidebarProjects projects={projects} />
      </SidebarContent>
      <SidebarFooter>
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
