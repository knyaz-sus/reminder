"use client";

import Link from "next/link";
import { SidebarMenuButton } from "./sidebar";
import { Hash } from "lucide-react";
import { Project } from "@/schemas/project-schema";
import { ProjectUpdateDialog } from "@/modules/project/components/project-update-dialog";
import { usePathname } from "next/navigation";

export function SidebarProject(project: Project) {
  const pathname = usePathname();
  return (
    <SidebarMenuButton
      className="hover-parent"
      isActive={pathname === `/app/projects/${project.id}`}
      asChild
    >
      <div className="flex justify-between pr-0">
        <Link
          prefetch
          className="flex flex-auto items-center max-w-full ml-1 overflow-hidden gap-2 [&>svg]:size-4 [&>svg]:shrink-0 p-1 hover:text-sidebar-foreground"
          href={`/app/projects/${project.id}`}
        >
          <Hash />
          <span className="text-ellipsis whitespace-nowrap overflow-hidden">
            {project.name}
          </span>
        </Link>
        <ProjectUpdateDialog {...project} />
      </div>
    </SidebarMenuButton>
  );
}
