"use client";

import { useQueryClient } from "@tanstack/react-query";
import { SidebarMenuButton, SidebarMenuItem } from "./sidebar";
import { useState } from "react";
import { signOut } from "@/modules/auth/api/sign-out";
import { LogOut } from "lucide-react";
import { Spinner } from "@/components/spinner";

export function SidebarLogOutButton() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const queryClient = useQueryClient();
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
    <SidebarMenuItem>
      <SidebarMenuButton onClick={handleSignOut} size="sm">
        {isLoggingOut ? <Spinner /> : <LogOut />}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
