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
import { Project } from "@/types/schemas";
import { useUpdateProject } from "../hooks/use-update-project";

export function ProjectUpdateDialog(project: Project) {
  const [updateName, setUpdateName] = useState(project.name);
  const { handleDelete } = useDeleteProject();
  const { handleUpdate } = useUpdateProject();
  const deleteProject = () => {
    handleDelete({ id: project.id, adminId: project.adminId });
  };
  const updateProject = () => {
    handleUpdate({ id: project.id, name: updateName });
  };
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="[&>svg]:size-4 [&>svg]:shrink-0 p-1 hover:text-sidebar-foreground/80 hover-child">
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
        <DialogContent customClose className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update project</DialogTitle>
            <DialogDescription>
              Provide please neccesary information.
            </DialogDescription>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <label htmlFor="link" className="sr-only">
                  Name
                </label>
                <Input
                  id="link"
                  value={updateName}
                  onChange={(e) => setUpdateName(e.target.value)}
                />
              </div>
            </div>
          </DialogHeader>
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
