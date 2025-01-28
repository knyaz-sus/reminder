"use client";

import { useState } from "react";
import { v4 as uuid } from "uuid";
import { DialogFooter, DialogHeader } from "@/components/dialog";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Plus } from "lucide-react";
import { useCreateProject } from "../hooks/use-create-project";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/dialog";

export function ProjectCreateDialog() {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const { handleCreate } = useCreateProject();

  const createProject = async () => {
    setOpen(false);
    await handleCreate({ name, id: uuid() });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="[&>svg]:size-4 [&>svg]:shrink-0  hover:text-sidebar-foreground">
        <Plus strokeWidth={3} />
      </DialogTrigger>
      <DialogContent customClose className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add new project</DialogTitle>
          <DialogDescription>
            Provide please neccesary information.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <label htmlFor="link" className="sr-only">
              Name
            </label>
            <Input
              id="link"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="flex w-full gap-1 ">
          <DialogClose asChild>
            <Button size="sm" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button onClick={createProject} size="sm" disabled={!name}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
