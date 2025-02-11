import { SidebarProvider } from "@/context/sidebar-provider";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { AppHeader } from "./app-header";
import { ReactNode } from "react";
import { cookies } from "next/headers";
import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import { redirect } from "next/navigation";
import { userApi } from "@/api/user-api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { makeQueryClient } from "@/lib/get-query-client";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  const queryClient = makeQueryClient();
  const supabase = await createServerSupabase();

  const session = await supabase.auth.getSession();
  if (!session) redirect("/auth");

  await Promise.allSettled([
    queryClient.prefetchQuery(
      userApi.getUserQueryOptions(session.data.session?.user.id, supabase)
    ),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <AppHeader />
        <main className="flex justify-center px-4 pb-6 pt-16 flex-auto ">
          {children}
        </main>
      </SidebarProvider>
    </HydrationBoundary>
  );
}
