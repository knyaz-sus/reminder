import { Metadata } from "next";
import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { SidebarProvider } from "@/context/sidebar-provider";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { UserAvatarContextProvider } from "@/context/user-avatar-provider";
import { createServerSupabase } from "@/lib/supabase/create-server-supabase";

export const metadata: Metadata = {
  title: "Reminder",
  description: "Task manager application",
};

export default async function AppLayout({ children }: PropsWithChildren) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  const supabase = await createServerSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    redirect("/auth/signin");
  }
  return (
    <UserAvatarContextProvider initialSession={session}>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        {children}
      </SidebarProvider>
    </UserAvatarContextProvider>
  );
}
