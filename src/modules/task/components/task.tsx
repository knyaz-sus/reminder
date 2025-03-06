"use client";

import { useState } from "react";
import { Separator } from "@/components/separator";
import { Calendar, GripVertical } from "lucide-react";
import { UpdateTaskModal } from "./update-task-dialog";
import { TaskCheck } from "./task-check";
import { useUpdateTask } from "@/modules/task/hooks/api/use-update-task";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task as TaskType } from "@/schemas/task-schema";
import { StaticEditor } from "@/components/editor/static-editor";
import { useIsServer } from "@/hooks/use-is-server";
import { formatTaskDate } from "@/modules/task/utils/format-task-date";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { cn } from "@/lib/cn";

export function Task(props: TaskType & { isSortable: boolean; param: string }) {
  const [open, setOpen] = useState(false);
  const { handleDone } = useUpdateTask(props.param);
  const isServer = useIsServer();
  const isMobile = useIsMobile();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props.id,
    disabled: !props.isSortable || open,
  });
  const toggleDone = () => handleDone(props.id, !props.isDone);
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : 0,
  };
  return (
    <div
      {...(!isMobile && { ...attributes, ...listeners })}
      style={style}
      ref={setNodeRef}
      className={cn(
        "flex flex-col gap-2 mb-2 bg-background touch-none relative",
        { "touch-none": !isMobile }
      )}
      aria-describedby=""
    >
      {isMobile && (
        <GripVertical
          {...attributes}
          {...listeners}
          className="absolute top-[0.3rem] -left-6"
          size={18}
        />
      )}
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
            <StaticEditor content={props.title} />
            {!!props.description && props.description !== "<p></p>" && (
              <StaticEditor
                className="text-xs text-foreground/80"
                content={props.description ? props.description : undefined}
              />
            )}
            {!!props.date && props.param !== "today" && (
              <button className="flex items-start gap-1 text-xs">
                {props.date && !isServer && (
                  <>
                    <Calendar size={14} />
                    <span>{formatTaskDate(props.date)}</span>
                  </>
                )}
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
