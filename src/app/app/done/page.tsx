import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import { taskApi } from "@/modules/task/task-api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { makeQueryClient } from "@/lib/get-query-client";
import { Done } from "./done";
import { userApi } from "@/api/user-api";

export default async function DonePage() {
  const queryClient = makeQueryClient();
  const supabase = await createServerSupabase();
  await Promise.allSettled([
    queryClient.prefetchQuery(userApi.getUserQueryOptions(supabase)),
    queryClient.prefetchQuery(taskApi.getDoneTasksQueryOptions(supabase)),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Done />
    </HydrationBoundary>
  );
}
