"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { LogOut } from "lucide-react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { userApi } from "@/api/user-api";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "./sidebar";
import { signOut } from "@/modules/auth/api/sign-out";

export function SidebarUserMenu() {
  const queryClient = useQueryClient();
  const { data: user } = useQuery({
    ...userApi.getUserQueryOptions(),
  });
  const handleSignOut = () => {
    queryClient.clear();
    signOut();
  };
  return (
    <SidebarHeader>
      <SidebarMenu className="flex-row justify-between items-center">
        <SidebarMenuItem className="flex gap-2 items-center text-sm">
          <Avatar className="h-7 w-7">
            <AvatarImage />
            <AvatarFallback className="bg-secondary text-secondary-foreground p-1 rounded-full">
              {user?.name?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="max-w-32 font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
            {user?.name}
          </span>
        </SidebarMenuItem>
        <div className="flex">
          <SidebarMenuItem>
            <SidebarMenuButton size="sm">
              <LogOut onClick={handleSignOut} />
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
