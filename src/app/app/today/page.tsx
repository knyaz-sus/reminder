import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import { taskApi } from "@/modules/task/api/task-api";
import { makeQueryClient } from "@/lib/get-query-client";
import TodayPage from "./client-page";

export default async function Today() {
  const supabase = await createServerSupabase();

  const queryClient = makeQueryClient();

  await Promise.allSettled([
    queryClient.fetchQuery(taskApi.getTodayTasksQueryOptions(supabase)),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TodayPage />
    </HydrationBoundary>
  );
}
