import { Sidebar, SidebarContent, SidebarFooter } from "./sidebar";
import { SidebarProjects } from "./sidebar-projects";
import { SidebarRoutes } from "./sidebar-routes";
import { SidebarUserMenu } from "./sidebar-user-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import { projectApi } from "@/modules/project/project-api";
import { makeQueryClient } from "@/lib/get-query-client";
import { userApi } from "@/api/user-api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export async function AppSidebar() {
  const supabase = await createServerSupabase();
  const queryClient = makeQueryClient();

  await Promise.allSettled([
    queryClient.prefetchQuery(userApi.getUserQueryOptions(supabase)),
    queryClient.prefetchQuery(projectApi.getAllProjectsQueryOptions(supabase)),
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
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
    </HydrationBoundary>
  );
}
