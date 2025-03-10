"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { LogOut } from "lucide-react";
import { userApi } from "@/api/user-api";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "./sidebar";
import { signOut } from "@/modules/auth/api/sign-out";
import { Spinner } from "@/components/spinner";

export function SidebarUserMenu() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const queryClient = useQueryClient();
  const { data: user } = useQuery(userApi.getUserQueryOptions());
  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true);
      await signOut();
    } catch {
      setIsLoggingOut(false);
    } finally {
      queryClient.clear();
    }
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
            <SidebarMenuButton onClick={handleSignOut} size="sm">
              {isLoggingOut ? <Spinner /> : <LogOut />}
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
