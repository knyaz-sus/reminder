import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ProjectPage } from "./client-page";
import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import { taskApi } from "@/modules/task/task-api";
import { projectApi } from "@/modules/project/project-api";
import { makeQueryClient } from "@/lib/get-query-client";

export default async function Project({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const supabase = await createServerSupabase();

  const { projectId } = await params;
  const queryClient = makeQueryClient();

  await Promise.allSettled([
    queryClient.prefetchQuery(
      taskApi.getProjectTasksQueryOptions(projectId, supabase)
    ),
    queryClient.prefetchQuery(
      projectApi.getProjectQueryOptions(projectId, supabase)
    ),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectPage />
    </HydrationBoundary>
  );
}
