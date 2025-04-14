import { Button } from "@/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import { projectApi } from "@/modules/project/project-api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useUpdateTask } from "../hooks/api/use-update-task";

interface ProjectsDropdownProps {
  taskId: string;
  projectId: string | null;
}

export function ProjectsDropdown({ taskId, projectId }: ProjectsDropdownProps) {
  const { data: projects } = useSuspenseQuery(
    projectApi.getAllProjectsQueryOptions()
  );
  const project = projects.find((project) => project.id === projectId);
  const { handleUpdate } = useUpdateTask(taskId);
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <span className="max-w-28 overflow-hidden text-ellipsis">
            {project ? project.name : "Change project"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          {projects?.map((project) => (
            <DropdownMenuItem
              key={project.id}
              onClick={() => {
                handleUpdate({ id: taskId, projectId: project.id });
              }}
            >
              <span className="overflow-hidden text-ellipsis">
                {project.name}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
