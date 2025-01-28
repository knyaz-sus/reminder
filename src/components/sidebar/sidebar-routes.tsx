"use client";

import { Search } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./sidebar";
import { sidebarMenuRoutes } from "./constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SidebarRoutes() {
  const pathname = usePathname();
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
          {sidebarMenuRoutes.map((route, index) => {
            const { path, name, Icon } = route;
            return (
              <SidebarMenuItem key={path + index}>
                <SidebarMenuButton asChild isActive={pathname === path}>
                  <Link href={path} prefetch>
                    <Icon />
                    <span>{name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
