"use client";

import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Ellipsis, PencilLine, Trash2 } from "lucide-react";
import { useDeleteProject } from "../hooks/use-delete-project";
import { Project } from "@/schemas/project-schema";
import { useUpdateProject } from "../hooks/use-update-project";
import { cn } from "@/lib/cn";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { z } from "zod";

export function ProjectUpdateDialog(project: Project) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const [updateName, setUpdateName] = useState(project.name);

  const { handleDelete } = useDeleteProject();
  const { mutate: handleUpdate } = useUpdateProject();

  const deleteProject = () => {
    handleDelete({ id: project.id, adminId: project.adminId });
  };
  const updateProject = () => {
    z.string().nonempty().safeParse(updateName);
    handleUpdate({ id: project.id, name: updateName });
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger
          className={cn(
            "[&>svg]:size-4 [&>svg]:shrink-0 p-1 hover:text-sidebar-foreground/80",
            { "hover-child": !isMobile }
          )}
        >
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent>
            <DialogTrigger>
              <DropdownMenuItem className="gap-3">
                <PencilLine />
                <span>Change project</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem className="gap-3" onClick={deleteProject}>
              <Trash2 />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
      <DialogPortal>
        <DialogContent customClose>
          <DialogHeader>
            <DialogTitle>Update project</DialogTitle>
            <DialogDescription>
              Provide please neccesary information.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center">
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <Input
              onKeyDown={(e) => {
                if (e.key === "Enter") updateProject();
              }}
              id="name"
              value={updateName}
              onChange={(e) => setUpdateName(e.target.value)}
            />
          </div>
          <DialogFooter className="flex w-full gap-1">
            <DialogClose asChild>
              <Button size="sm" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                onClick={updateProject}
                disabled={updateName === ""}
                size="sm"
              >
                Confirm
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
