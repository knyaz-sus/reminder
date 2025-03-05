"use client";

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
import { LinkPrefetch } from "../link-prefetch";

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
              <LinkPrefetch href="/app/inbox">
                <Inbox />
                <span>Inbox</span>
              </LinkPrefetch>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setOpenMobile(false)}
              asChild
              isActive={pathname === "/app/today"}
            >
              <LinkPrefetch href="/app/today">
                <SquareChartGantt />
                <span>Today</span>
              </LinkPrefetch>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setOpenMobile(false)}
              asChild
              isActive={pathname === "/app/done"}
            >
              <LinkPrefetch href="/app/done">
                <CircleCheck />
                <span>Done</span>
              </LinkPrefetch>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
