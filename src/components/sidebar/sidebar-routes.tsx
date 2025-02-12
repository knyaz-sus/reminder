"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleCheck, Inbox, Search, SquareChartGantt } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./sidebar";
import { useSidebar } from "@/hooks/use-sidebar";

export function SidebarRoutes() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Search />
              <span>Search</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setOpenMobile(false)}
              asChild
              isActive={pathname === "/app/inbox"}
            >
              <Link href="/app/inbox" prefetch>
                <Inbox />
                <span>Inbox</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setOpenMobile(false)}
              asChild
              isActive={pathname === "/app/today"}
            >
              <Link href="/app/today" prefetch>
                <SquareChartGantt />
                <span>Today</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setOpenMobile(false)}
              asChild
              isActive={pathname === "/app/done"}
            >
              <Link href="/app/done">
                <CircleCheck />
                <span>Done</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
