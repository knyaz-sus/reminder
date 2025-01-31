import { Sidebar, SidebarContent, SidebarFooter } from "./sidebar";
import { SidebarProjects } from "./sidebar-projects";
import { SidebarRoutes } from "./sidebar-routes";
import { SidebarUserMenu } from "./sidebar-user-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import { QueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { projectQueryOptions } from "@/modules/project/api/project-query-options";

export async function AppSidebar() {
  const supabase = await createServerSupabase();
  const session = await supabase.auth.getSession();
  if (!session) {
    redirect("/auth");
  }

  const queryClient = new QueryClient();
  const projects = await queryClient.fetchQuery(
    projectQueryOptions.getAllProjectsQueryOptions(
      session.data.session?.user.id,
      supabase
    )
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
