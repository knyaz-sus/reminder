import { ReactNode } from "react";
import { cookies } from "next/headers";
import { SidebarProvider } from "@/context/sidebar-provider";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      {children}
    </SidebarProvider>
  );
}
