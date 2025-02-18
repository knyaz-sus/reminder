import { ReactNode } from "react";
import { cookies } from "next/headers";
import { SidebarProvider } from "@/context/sidebar-provider";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarTrigger } from "@/components/sidebar/sidebar";
import { ViewOptions } from "@/components/view-options";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <header className="flex items-center fixed w-full justify-between h-[52px] z-[2] bg-background px-4">
        <SidebarTrigger />
        <ViewOptions />
      </header>
      <main className="flex justify-center px-4 pb-6 pt-16 flex-auto ">
        {children}
      </main>
    </SidebarProvider>
  );
}
