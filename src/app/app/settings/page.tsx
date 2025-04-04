import { userApi } from "@/api/user-api";
import { makeQueryClient } from "@/lib/get-query-client";
import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SettingsPageDialog } from "./client-page";

export default async function SettingsPage() {
  const supabase = await createServerSupabase();
  const queryClient = makeQueryClient();
  await queryClient.prefetchQuery(userApi.getUserQueryOptions(supabase));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SettingsPageDialog />
    </HydrationBoundary>
  );
}
