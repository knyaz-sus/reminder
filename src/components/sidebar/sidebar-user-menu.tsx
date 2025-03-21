import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "./sidebar";
import { SidebarAvatar } from "./sidebar-avatar";
import { SidebarLogOutButton } from "./sidebar-logout-button";

export function SidebarUserMenu() {
  return (
    <SidebarHeader>
      <SidebarMenu className="flex-row justify-between items-center">
        <SidebarAvatar />
        <div className="flex">
          <SidebarLogOutButton />
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
