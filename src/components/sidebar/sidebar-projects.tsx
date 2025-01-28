"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/collapsible";
import { ChevronDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/modules/auth/hooks/use-auth";
import { ProjectCreateDialog } from "@/modules/project/components/project-create-dialog";
import { SidebarProject } from "./sidebar-project";
import { SidebarGroup, SidebarGroupContent } from "./sidebar";
import { projectQueryOptions } from "@/modules/project/api/project-query-options";
import { Projects } from "@/types/schemas";

export function SidebarProjects({
  projects,
}: {
  projects: Projects | undefined;
}) {
  const { session } = useAuth();
  const { data } = useQuery({
    ...projectQueryOptions.getAllProjectsQueryOptions(session?.user.id),
    initialData: projects,
  });

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <Collapsible defaultOpen className="group/collapsible">
          <div
            className="flex justify-between items-center gap-2
          w-full rounded-md pl-2 py-1 overflow-hidden outline-none 
          text-sidebar-foreground/80 text-left text-sm font-semibold
          hover:bg-sidebar-accent"
          >
            <div className="flex-auto">My projects</div>
            <ProjectCreateDialog />
            <CollapsibleTrigger className="[&>svg]:size-4 [&>svg]:shrink-0 p-1">
              <ChevronDown
                strokeWidth={3}
                className="ml-auto transition-transform 
            group-data-[state=open]/collapsible:rotate-180
            hover:text-sidebar-foreground"
              />
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="overflow-auto">
            {!data || data?.length === 0 ? (
              <div className="text-center p-4">
                You don&apos;t have any projects
              </div>
            ) : (
              data?.map((project) => (
                <SidebarProject key={project.id} {...project} />
              ))
            )}
          </CollapsibleContent>
        </Collapsible>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
