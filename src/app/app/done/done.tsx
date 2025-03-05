"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageContainer } from "@/components/page-container";
import { PageHeader } from "@/components/page-header";
import { PageFilter } from "@/constants/ui";
import { DoneTask } from "@/modules/task/components/done-task";
import { taskApi } from "@/modules/task/task-api";

export function Done() {
  const [filter, setFilter] = useState<PageFilter>("Date ascending");
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
    <>
      <PageHeader filter={filter} setFilter={setFilter} />
      <PageContainer>
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
      </PageContainer>
    </>
  );
}
