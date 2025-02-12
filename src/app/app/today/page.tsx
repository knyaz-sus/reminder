"use client";

import { TasksSkeleton } from "@/components/tasks-skeleton";
import { CreateTask } from "@/modules/task/components/create-task";
import { Task } from "@/modules/task/components/task";
import { useCreateTask } from "@/modules/task/hooks/api/use-create-task";
import { useQueryPageTasks } from "@/modules/task/hooks/api/use-query-page-tasks";
import { startOfDay } from "date-fns";
import { useMemo } from "react";

export default function TodayPage() {
  const { mutate: handleCreate } = useCreateTask("today");

  const { tasks, isPending } = useQueryPageTasks();

  const defaultDate = useMemo(() => startOfDay(new Date()), []);

  return (
    <div className="flex flex-col flex-auto max-w-[85vw] lg:max-w-3xl">
      <h1 className="mb-4">Today</h1>
      <div className="flex flex-col">
        {isPending ? (
          <TasksSkeleton />
        ) : (
          <>
            {tasks?.map((task) => (
              <Task param="today" isSortable={false} key={task.id} {...task} />
            ))}
            <CreateTask
              projectId={null}
              createTask={handleCreate}
              order={null}
              defaultDate={defaultDate}
            />
          </>
        )}
      </div>
    </div>
  );
}
