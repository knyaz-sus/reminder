import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import { taskApi } from "@/modules/task/task-api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { Done } from "./done";

export default async function DonePage() {
  const queryClient = getQueryClient();
  const supabase = await createServerSupabase();
  await queryClient.prefetchQuery(taskApi.getDoneTasksQueryOptions(supabase));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Done />
    </HydrationBoundary>
  );
}
