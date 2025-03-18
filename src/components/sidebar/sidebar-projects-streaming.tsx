import { makeQueryClient } from "@/lib/get-query-client";
import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import { projectApi } from "@/modules/project/project-api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SidebarProjects } from "./sidebar-projects";

export async function SidebarProjectsStreaming() {
  const supabase = await createServerSupabase();
  const queryClient = makeQueryClient();
  await queryClient.prefetchQuery(
    projectApi.getAllProjectsQueryOptions(supabase)
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SidebarProjects />
    </HydrationBoundary>
  );
}
