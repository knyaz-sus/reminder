import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import { taskApi } from "@/modules/task/task-api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Inbox from "./client-page";
import { makeQueryClient } from "@/lib/get-query-client";

export default async function InboxPage() {
  const queryClient = makeQueryClient();
  const supabase = await createServerSupabase();
  await queryClient.prefetchQuery(taskApi.getInboxTasksQueryOptions(supabase));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Inbox />
    </HydrationBoundary>
  );
}
