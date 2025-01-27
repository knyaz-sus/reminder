import { SidebarProvider } from "@/context/sidebar-provider";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { AppHeader } from "./app-header";
import { ReactNode } from "react";
import { cookies } from "next/headers";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <AppHeader />
      <main className="flex justify-center pb-6 pt-16 flex-auto ">
        {children}
      </main>
    </SidebarProvider>
  );
}
