import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ProjectPage from "./client-page";
import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import { redirect } from "next/navigation";
import { taskQueryOptions } from "@/modules/task/api/task-query-options";
import { projectQueryOptions } from "@/modules/project/api/project-query-options";

export default async function Project({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const supabase = await createServerSupabase();

  const user = supabase.auth.getUser();
  if (!user) redirect("/auth");

  const { projectId } = await params;
  const queryClient = new QueryClient();

  await Promise.allSettled([
    queryClient.prefetchQuery(
      taskQueryOptions.getProjectTasksQueryOptions(projectId, supabase)
    ),
    queryClient.prefetchQuery(
      projectQueryOptions.getProjectQueryOptions(projectId, supabase)
    ),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectPage />
    </HydrationBoundary>
  );
}
