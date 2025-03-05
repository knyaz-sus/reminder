"use client";

import { useMemo, useState } from "react";
import { PageContainer } from "@/components/page-container";
import { PageHeader } from "@/components/page-header";
import { TasksSkeleton } from "@/components/tasks-skeleton";
import { PageFilter } from "@/constants/ui";
import { CreateTask } from "@/modules/task/components/create-task";
import { Task } from "@/modules/task/components/task";
import { useCreateTask } from "@/modules/task/hooks/api/use-create-task";
import { useQueryTodayTasks } from "@/modules/task/hooks/api/use-query-today-tasks";
import { startOfDay } from "date-fns";

export default function TodayPage() {
  const [filter, setFilter] = useState<PageFilter>("Date ascending");
  const { mutate: handleCreate } = useCreateTask("today");

  const { tasks, isPending } = useQueryTodayTasks(filter);

  const defaultDate = useMemo(() => startOfDay(new Date()), []);

  return (
    <>
      <PageHeader filter={filter} setFilter={setFilter} />
      <PageContainer>
        <h1 className="mb-4">Today</h1>
        <div className="flex flex-col">
          {isPending ? (
            <TasksSkeleton />
          ) : (
            <>
              {tasks?.map((task) => (
                <Task
                  param="today"
                  isSortable={false}
                  key={task.id}
                  {...task}
                />
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
      </PageContainer>
    </>
  );
}
