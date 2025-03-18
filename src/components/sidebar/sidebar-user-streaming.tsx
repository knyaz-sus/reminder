import { makeQueryClient } from "@/lib/get-query-client";
import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SidebarUserMenu } from "./sidebar-user-menu";
import { userApi } from "@/api/user-api";

export async function SidebarUserStreaming() {
  const supabase = await createServerSupabase();
  const queryClient = makeQueryClient();
  await queryClient.prefetchQuery(userApi.getUserQueryOptions(supabase));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SidebarUserMenu />
    </HydrationBoundary>
  );
}
