import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ProjectPage from "./client-page";
import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import { taskQueryOptions } from "@/modules/task/api/task-query-options";
import { projectQueryOptions } from "@/modules/project/api/project-query-options";

export default async function Project({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const supabase = await createServerSupabase();

  const { projectId } = await params;
  const queryClient = new QueryClient();

  const queries = await Promise.allSettled([
    queryClient.fetchQuery(
      taskQueryOptions.getProjectTasksQueryOptions(projectId, supabase)
    ),
    queryClient.fetchQuery(
      projectQueryOptions.getProjectQueryOptions(projectId, supabase)
    ),
  ]);

  if (queries[0].status !== "fulfilled" || queries[1].status !== "fulfilled") {
    return (
      <div className="flex flex-col justify-center items-center min-h-svh">
        <h2>Something went wrong!</h2>
      </div>
    );
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectPage />
    </HydrationBoundary>
  );
}
