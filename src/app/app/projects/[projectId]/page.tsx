import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ProjectPage } from "./client-page";
import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import { taskApi } from "@/modules/task/task-api";
import { projectApi } from "@/modules/project/project-api";
import { makeQueryClient } from "@/lib/get-query-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reminder",
  description: "Task manager application",
};

export default async function Project({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const supabase = await createServerSupabase();

  const { projectId } = await params;
  const queryClient = makeQueryClient();

  const queries = await Promise.allSettled([
    queryClient.fetchQuery(
      taskApi.getProjectTasksQueryOptions(projectId, supabase)
    ),
    queryClient.fetchQuery(
      projectApi.getProjectQueryOptions(projectId, supabase)
    ),
  ]);

  if (queries[0].status !== "fulfilled" || queries[1].status !== "fulfilled") {
    return (
      <div className="flex flex-col justify-center items-center min-h-svh w-full">
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
