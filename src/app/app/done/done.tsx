"use client";

import { DoneTask } from "@/modules/task/components/done-task";
import { taskApi } from "@/modules/task/task-api";
import { useQuery } from "@tanstack/react-query";

export function Done() {
  const { data: doneTasks } = useQuery({
    ...taskApi.getDoneTasksQueryOptions(),
    select(data) {
      return data.sort(
        (a, b) => Number(new Date(a.createdAt)) - Number(new Date(b.createdAt))
      );
    },
  });
  if (!doneTasks) return null;

  return (
    <div className="flex flex-col flex-auto max-w-[85vw] lg:max-w-3xl">
      <h1 className="mb-4">Done</h1>
      <div className="flex items-start flex-col">
        {doneTasks?.map((task) => (
          <DoneTask key={task.id} {...task} />
        ))}
      </div>
      {doneTasks.length === 0 && (
        <div className="flex justify-center items-center">
          <span>You don&apos;t have any done tasks</span>
        </div>
      )}
    </div>
  );
}
