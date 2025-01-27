"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/collapsible";
import { ChevronDown } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/modules/auth/hooks/use-auth";
import { ProjectCreateDialog } from "@/modules/project/project-create-dialog";
import { SidebarProject } from "./sidebar-project";
import { projectApi } from "@/modules/project/project-api";
import { SidebarGroup, SidebarGroupContent } from "./sidebar";

export function SidebarProjects() {
  const queryClient = useQueryClient();
  const { session, isAuthLoading } = useAuth();
  const {
    data: projects,
    isPending,
    isError,
  } = useQuery({
    ...projectApi.getAllProjectsQueryOptions(session?.user.id, queryClient),
    enabled: !!session?.user && !isAuthLoading,
    select(data) {
      return data.sort(
        (a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
      );
    },
  });
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    <div>Can&apos;t get projects</div>;
  }
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
            {projects?.length === 0 ? (
              <div className="text-center p-4">
                You don&apos;t have any projects
              </div>
            ) : (
              projects?.map((project) => (
                <SidebarProject key={project.id} {...project} />
              ))
            )}
          </CollapsibleContent>
        </Collapsible>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
