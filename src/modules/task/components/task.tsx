"use client";

import { useState } from "react";

import { Separator } from "@/components/separator";
import { Calendar } from "lucide-react";
import { UpdateTaskModal } from "./update-task-dialog";
import { TaskCheck } from "./task-check";
import { useUpdateTask } from "../hooks/use-update-task";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task as TaskType } from "@/schemas/task-schema";
import dynamic from "next/dynamic";

const TimeNoSSR = dynamic(() => import("@/components/time"), { ssr: false });
const StaticEditorNoSSR = dynamic(
  () => import("@/components/editor/static-editor"),
  { ssr: false }
);
export function Task(props: TaskType & { isSortable: boolean; param: string }) {
  const [open, setOpen] = useState(false);
  const { handleDone } = useUpdateTask(props.param);
  const toggleDone = () => handleDone(props.id, !props.isDone);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props.id,
    disabled: !props.isSortable,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : 0,
  };
  return (
    <div
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
      className="flex flex-col gap-2 mb-2 bg-background touch-none"
      aria-describedby=""
    >
      <div className="flex cursor-pointer group flex-col">
        <div className="flex items-start w-full py-1 gap-2">
          <TaskCheck
            className="mt-[2px]"
            priority={props.priority}
            onClick={toggleDone}
            isDone={props.isDone}
          />
          <div
            onClick={() => setOpen(true)}
            className="flex flex-col gap-1 w-full "
          >
            <StaticEditorNoSSR content={props.title} />
            {!!props.description && props.description !== "<p></p>" && (
              <StaticEditorNoSSR
                className="text-xs text-foreground/80"
                content={props.description ? props.description : undefined}
              />
            )}
            {!!props.date && props.param !== "today" && (
              <button className="flex items-start gap-1 text-xs">
                <Calendar size={14} />
                <TimeNoSSR date={props.date} />
              </button>
            )}
          </div>
        </div>
      </div>
      <Separator />
      <UpdateTaskModal open={open} onOpenChange={setOpen} {...props} />
    </div>
  );
}
