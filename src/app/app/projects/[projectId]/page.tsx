import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Project } from "./client-page";
import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import { taskApi } from "@/modules/task/task-api";
import { getQueryClient } from "@/lib/get-query-client";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  const supabase = await createServerSupabase();
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(
    taskApi.getProjectTasksQueryOptions(projectId, supabase)
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Project />
    </HydrationBoundary>
  );
}
