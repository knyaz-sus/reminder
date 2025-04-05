"use client";

import Link from "next/link";
import { Settings } from "lucide-react";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "./sidebar";
import { useQuery } from "@tanstack/react-query";
import { userApi } from "@/api/user-api";
import { UserAvatar } from "@/components/user-avatar";
import { useSidebar } from "@/hooks/use-sidebar";

export function SidebarUserMenu() {
  const { data: user } = useQuery(userApi.getUserQueryOptions());
  const { setOpenMobile } = useSidebar();
  const closeSidebar = () => setOpenMobile(false);
  return (
    <SidebarHeader>
      <SidebarMenu className="flex-row justify-between items-center">
        <SidebarMenuItem className="flex gap-3 items-center text-sm">
          <UserAvatar size={28} />
          <span className="max-w-32 font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
            {user?.name}
          </span>
        </SidebarMenuItem>
        <div className="flex">
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="sm" onClick={closeSidebar}>
              <Link scroll={false} href="/app/settings">
                <Settings />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="sm">
              <SidebarTrigger />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </div>
      </SidebarMenu>
    </SidebarHeader>
  );
}
