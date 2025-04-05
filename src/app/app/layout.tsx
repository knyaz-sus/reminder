import { Metadata } from "next";
import { ReactNode } from "react";
import { cookies } from "next/headers";
import { SidebarProvider } from "@/context/sidebar-provider";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { UserAvatarContextProvider } from "@/context/user-avatar-provider";

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

  return (
    <UserAvatarContextProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        {children}
        {modal}
      </SidebarProvider>
    </UserAvatarContextProvider>
  );
}
