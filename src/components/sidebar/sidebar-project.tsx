"use client";

import { SidebarMenuButton } from "./sidebar";
import { Hash } from "lucide-react";
import { Project } from "@/schemas/project-schema";
import { ProjectUpdateDialog } from "@/modules/project/components/project-update-dialog";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/hooks/use-sidebar";
import { LinkPrefetch } from "@/components/link-prefetch";

export function SidebarProject(project: Project) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  return (
    <SidebarMenuButton
      className="hover-parent"
      isActive={pathname === `/app/projects/${project.id}`}
      asChild
      onClick={() => setOpenMobile(false)}
    >
      <div className="flex justify-between pr-0">
        <LinkPrefetch
          className="flex flex-auto items-center max-w-full ml-1 overflow-hidden gap-2 [&>svg]:size-4 [&>svg]:shrink-0 p-1 hover:text-sidebar-foreground"
          href={`/app/projects/${project.id}`}
        >
          <Hash />
          <span className="text-ellipsis whitespace-nowrap overflow-hidden">
            {project.name}
          </span>
        </LinkPrefetch>
        <ProjectUpdateDialog {...project} />
      </div>
    </SidebarMenuButton>
  );
}
