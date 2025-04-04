import Link from "next/link";
import { Settings } from "lucide-react";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "./sidebar";
import { SidebarAvatar } from "./sidebar-avatar";

export function SidebarUserMenu() {
  return (
    <SidebarHeader>
      <SidebarMenu className="flex-row justify-between items-center">
        <SidebarAvatar />
        <div className="flex">
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="sm">
              <Link
                scroll={false}
                href={{ pathname: "/app/settings", query: { modal: true } }}
              >
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
