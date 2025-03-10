"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { DatePicker } from "@/components/date-picker";
import { Separator } from "@/components/separator";
import { Plus, Trash2, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import { TaskCheck } from "./task-check";
import { Task } from "@/schemas/task-schema";
import { useDeleteTask } from "@/modules/task/hooks/api/use-delete-task";
import { useUpdateTask } from "@/modules/task/hooks/api/use-update-task";
import dynamic from "next/dynamic";
import { PrioritySelect } from "./priority-select";

const DynamicRichTextEditor = dynamic(
  () => import("@/components/editor/rich-editor"),
  {
    ssr: false,
    loading: () => (
      <div className="placeholder min-h-[20px] text-sm">Loading editor...</div>
    ),
  }
);

type UpdateTaskModalProps = {
  open: boolean;
  onOpenChange: (arg: boolean) => void;
  param: string;
} & Task;

export function UpdateTaskModal({
  open,
  onOpenChange,
  id,
  title,
  description,
  date,
  priority,
  isDone,
  param,
}: UpdateTaskModalProps) {
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [controlledDate, setControlledDate] = useState<Date | undefined>(
    date ? new Date(date) : undefined
  );
  const [updatedPriority, setUpdatedPriority] = useState(priority);
  const { mutate } = useDeleteTask(param);
  const { handleUpdate, handleDone } = useUpdateTask(param);
  const deleteTask = () => {
    onOpenChange(false);
    mutate(id);
  };
  const updateTask = () => {
    onOpenChange(false);
    handleUpdate({
      id,
      title: updatedTitle,
      description: updatedDescription,
      date: controlledDate ? controlledDate.toISOString() : null,
      priority: updatedPriority,
    });
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="gap-0 items-center p-0 md:max-w-3xl w-full"
        customClose
      >
        <DialogHeader className="flex items-center flex-row py-2 pr-3 pl-2">
          <div className="flex w-full justify-end gap-2">
            <Button variant="ghost" size="xs" onClick={deleteTask}>
              <Trash2 />
            </Button>
            <DialogClose asChild>
              <Button variant="ghost" size="xs">
                <X />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
        <Separator />
        <div className="flex flex-auto overflow-hidden">
          <div className="flex flex-col gap-2 p-4 w-2/3">
            <div className="flex gap-2 items-start">
              <TaskCheck
                priority={priority}
                onClick={() => handleDone(id, !isDone)}
                isDone={isDone}
              />
              <div className="flex flex-col gap-1 mb-2">
                <DynamicRichTextEditor
                  content={title}
                  handleSave={setUpdatedTitle}
                  autofocus="end"
                  placeholder="Provide title..."
                />
                <DynamicRichTextEditor
                  content={description ? description : undefined}
                  handleSave={setUpdatedDescription}
                  autofocus={false}
                  placeholder="Provide description..."
                />
              </div>
            </div>
            <Button
              className="self-start text-xs text-foreground/80"
              variant="ghost"
              size="sm"
            >
              <Plus />
              <span>Add subtask</span>
            </Button>
          </div>
          <div className="flex flex-col gap-2 bg-secondary/40 text-secondary-foreground p-4 w-1/3">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-foreground/80">Time</span>
              <DatePicker
                controlledDate={controlledDate}
                setControlledDate={setControlledDate}
              />
            </div>
            <Separator />
            <div className="flex flex-col gap-1">
              <span className="text-xs text-foreground/80">Priority</span>
              <PrioritySelect
                priority={updatedPriority}
                onSelectChange={setUpdatedPriority}
              />
            </div>
            <Button size="sm" onClick={updateTask}>
              Save
            </Button>
          </div>
        </div>
        <DialogTitle className="sr-only">Change task</DialogTitle>
        <DialogDescription className="sr-only">
          Change your task here
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
