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
import { projectApi } from "@/modules/project/api/project-api";
import { Projects } from "@/types/schemas";

export function SidebarProjects({
  projects,
}: {
  projects: Projects | undefined;
}) {
  const { session } = useAuth();
  const { data } = useQuery({
    ...projectApi.getAllProjectsQueryOptions(session?.user.id),
    initialData: projects,
  });

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <Collapsible defaultOpen className="group/collapsible">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "0.5rem",
              width: "100%",
              borderRadius: "0.375rem",
              paddingLeft: "0.5rem",
              paddingTop: "0.25rem",
              paddingBottom: "0.25rem",
              overflow: "hidden",
              outline: "none",
              color: "rgba(var(--color-sidebar-foreground), 0.8)",
              textAlign: "left",
              fontSize: "0.875rem",
              fontWeight: 600,
              transition: "background-color 0.2s",
            }}
          >
            <div className="flex-auto">My projects</div>
            <ProjectCreateDialog />
            <CollapsibleTrigger className="[&>svg]:size-4 [&>svg]:shrink-0 p-1 ml-auto">
              <ChevronDown
                className="w-4 h-4 shrink-0 transition-transform"
                strokeWidth={3}
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
