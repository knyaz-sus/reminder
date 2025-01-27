import { projectApi } from "@/modules/project/project-api";
import { taskApi } from "@/modules/task/task-api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ProjectPage from "./client-page";

export default async function Project({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const queryClient = new QueryClient();

  await Promise.allSettled([
    queryClient.prefetchQuery(taskApi.getProjectTasksQueryOptions(projectId)),
    queryClient.prefetchQuery(projectApi.getProjectQueryOptions(projectId)),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectPage />
    </HydrationBoundary>
  );
}
