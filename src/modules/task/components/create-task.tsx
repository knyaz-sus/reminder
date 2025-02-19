"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { DatePicker } from "@/components/date-picker";
import { Separator } from "@/components/separator";
import { RichEditor } from "@/components/editor/rich-editor";
import { PrioritySelect } from "./priority-select";
import { Priorities } from "@/constants/ui";
import { Plus } from "lucide-react";
import { useCreateState } from "../hooks/use-create-state";
import { CreateTaskRequest } from "@/schemas/task-schema";
import { v4 as uuid } from "uuid";

interface CreateTaskProps {
  projectId: string | null;
  order: number | null;
  createTask: (newTask: CreateTaskRequest) => void;
  defaultDate?: Date;
}

export function CreateTask({
  projectId,
  order,
  createTask,
  defaultDate,
}: CreateTaskProps) {
  const [title, setTitle] = useState("<p></p>");
  const [description, setDescription] = useState("<p></p>");
  const [date, setDate] = useState<Date | undefined>(defaultDate);

  const [priority, setPriority] = useState<Priorities>("4");
  const { isCreating, toggleCreating } = useCreateState();
  const resetInputs = () => {
    setTitle("<p></p>");
    setDescription("<p></p>");
    setDate(defaultDate);
    setPriority("4");
  };
  const cancelCreate = () => {
    toggleCreating();
    resetInputs();
  };
  const handleCreate = () => {
    createTask({
      id: uuid(),
      title,
      description,
      date: date?.toISOString(),
      priority,
      projectId,
      order,
    });
    resetInputs();
  };
  return isCreating ? (
    <div
      className="flex flex-col justify-center px-3 pt-3
                 border-border border rounded-md"
    >
      <div className="flex flex-col gap-1 mb-1">
        <RichEditor
          content={title}
          handleSave={setTitle}
          autofocus="end"
          placeholder="Provide title..."
        />
        <RichEditor
          content={description}
          handleSave={setDescription}
          autofocus={false}
          placeholder="Provide description..."
        />
      </div>
      <Separator />
      <div className="flex items-center flex-wrap justify-between py-2 gap-2">
        <div className="flex gap-2">
          <DatePicker controlledDate={date} setControlledDate={setDate} />
          <PrioritySelect priority={priority} onSelectChange={setPriority} />
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={cancelCreate}
            className="text-xs"
            size="sm"
            variant="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={title === "<p></p>"}
            className="text-xs"
            size="sm"
          >
            Add task
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <>
      {order === 1 && <Separator />}
      <Button
        onClick={toggleCreating}
        className="justify-start pl-0 text-foreground/60 hover:bg-inherit hover:text-foreground"
        size="sm"
        variant="ghost"
      >
        <Plus />
        <span>Add task</span>
      </Button>
    </>
  );
}
