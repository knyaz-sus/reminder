import { Metadata } from "next";
import { ReactNode } from "react";
import { cookies } from "next/headers";
import { SidebarProvider } from "@/context/sidebar-provider";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { UserAvatarContextProvider } from "@/context/user-avatar-provider";
import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import { projectApi } from "@/modules/project/project-api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { userApi } from "@/api/user-api/user-api";
import { WebVitals } from "./projects/[projectId]/web-vitals";

export const metadata: Metadata = {
  title: "Reminder",
  description: "Task manager application",
};

export default async function AppLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value !== "false";

  const queryClient = getQueryClient();
  const supabase = await createServerSupabase();
  const supabaseWithCache = await createServerSupabase({
    cache: "force-cache",
    next: {
      revalidate: 20 * 60,
      tags: ["user"],
    },
  });
  queryClient.prefetchQuery(projectApi.getAllProjectsQueryOptions(supabase));
  queryClient.prefetchQuery(userApi.getUserQueryOptions(supabaseWithCache));
  return (
    <>
      <WebVitals />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserAvatarContextProvider>
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            {children}
            {modal}
          </SidebarProvider>
        </UserAvatarContextProvider>
      </HydrationBoundary>
    </>
  );
}
