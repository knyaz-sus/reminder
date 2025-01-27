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
  const pathName = usePathname();
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
                <SidebarMenuButton asChild isActive={pathName === path}>
                  <Link href={path}>
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
