"use client";

import { useState } from "react";
import { Separator } from "@/components/separator";
import { Task } from "@/schemas/task-schema";
import { stripHtmlTags } from "@/modules/task/utils/remove-tags";
import { useIsServer } from "@/hooks/use-is-server";
import { formatTaskDate } from "@/modules/task/utils/format-task-date";
import { UpdateTaskModal } from "./update-task-dialog";
import { UserAvatar } from "@/components/user-avatar";
import { useSuspenseQuery } from "@tanstack/react-query";
import { projectApi } from "@/modules/project/project-api";
import { Hash, Inbox } from "lucide-react";

export function DoneTask(props: Task) {
  const { data: project } = useSuspenseQuery({
    ...projectApi.getAllProjectsQueryOptions(),
    select(data) {
      return data.find((project) => project.id === props.projectId);
    },
  });
  const [open, setOpen] = useState(false);
  const isServer = useIsServer();
  return (
    <div className="flex text-sm flex-col items-start gap-2 mb-2 bg-background w-full">
      <div className="flex gap-2 w-full">
        <UserAvatar size={40} />
        <div className="flex items-start group flex-col gap-1 flex-auto">
          <div className="flex w-full">
            <span>
              <strong>You</strong> completed task:{" "}
              <button onClick={() => setOpen(true)}>
                <span className="hover:underline">
                  {`${stripHtmlTags(props.title)}`}
                </span>
              </button>
            </span>
          </div>
          <div className="flex justify-between w-full">
            {props.doneAt && (
              <span className="text-xs">
                {!isServer && formatTaskDate(props.doneAt)}
              </span>
            )}
            <div className="flex gap-1 text-xs flex-auto justify-end text-muted-foreground">
              <span>{project ? project.name : "Inbox"}</span>
              {project ? <Hash size={14} /> : <Inbox size={14} />}
            </div>
          </div>
        </div>
      </div>
      <Separator />
      <UpdateTaskModal
        param="done"
        open={open}
        onOpenChange={setOpen}
        {...props}
      />
    </div>
  );
}
