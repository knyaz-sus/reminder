"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { LogOut, Settings } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { userApi } from "@/api/user-api";
import { useAuth } from "@/modules/auth/hooks/use-auth";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./sidebar";
import { signOut } from "@/modules/auth/api/sign-out";

export function SidebarUserMenu() {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const { data: user } = useQuery({
    ...userApi.getUserQueryOptions(session?.user.id),
  });
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
              <Settings />
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton size="sm">
              <LogOut
                onClick={() => {
                  queryClient.clear();
                  signOut();
                }}
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </div>
      </SidebarMenu>
    </SidebarHeader>
  );
}
