"use client";

import { useState } from "react";
import { Separator } from "@/components/separator";
import { Task } from "@/schemas/task-schema";
import { stripHtmlTags } from "@/modules/task/utils/remove-tags";
import { useIsServer } from "@/hooks/use-is-server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { useQuery } from "@tanstack/react-query";
import { userApi } from "@/api/user-api";
import { formatTaskDate } from "@/modules/task/utils/format-task-date";
import { UpdateTaskModal } from "./update-task-dialog";
import { useAvatar } from "@/hooks/use-avatar";

export function DoneTask(props: Task) {
  const [open, setOpen] = useState(false);
  const isServer = useIsServer();
  const { data: user } = useQuery(userApi.getUserQueryOptions());
  const { avatarUrl } = useAvatar();

  return (
    <div className="flex text-sm flex-col items-start gap-2 mb-2 bg-background w-full">
      <div className="flex gap-2">
        <Avatar className="h-10 w-10">
          {avatarUrl && (
            <AvatarImage
              src={avatarUrl}
              alt="User avatar"
              width={40}
              height={40}
              asChild
              className="w-10 h-10 aspect-square object-cover"
            />
          )}
          <AvatarFallback className="bg-secondary text text-secondary-foreground p-1 rounded-full">
            {user?.name?.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex items-start group flex-col gap-1">
          <div className="flex">
            <span>
              <strong>You</strong> completed task:{" "}
              <button onClick={() => setOpen(true)}>
                <span className="hover:underline">
                  {`${stripHtmlTags(props.title)}`}
                </span>
              </button>
            </span>
          </div>
          {props.doneAt && (
            <span className="text-xs">
              {!isServer &&
                formatTaskDate(props.doneAt) +
                  " " +
                  new Date(props.doneAt).toTimeString().slice(0, 5)}
            </span>
          )}
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
