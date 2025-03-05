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
import { z } from "zod";

export function ProjectCreateDialog() {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const { handleCreate } = useCreateProject();

  const createProject = async () => {
    z.string().nonempty().safeParse(name);
    setOpen(false);
    await handleCreate({ name, id: uuid() });
    setName("");
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="[&>svg]:size-4 [&>svg]:shrink-0  hover:text-sidebar-foreground">
        <Plus strokeWidth={3} />
      </DialogTrigger>
      <DialogContent customClose>
        <DialogHeader>
          <DialogTitle>Add new project</DialogTitle>
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
              if (e.key === "Enter") createProject();
            }}
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
