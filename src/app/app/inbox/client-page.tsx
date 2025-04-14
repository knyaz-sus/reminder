"use client";

import { useState } from "react";
import { PageContainer } from "@/components/page-container";
import { PageHeader } from "@/components/page-header";
import { PageFilter } from "@/constants/ui";
import { CreateTask } from "@/modules/task/components/create-task";
import { Task } from "@/modules/task/components/task";
import { useCreateTask } from "@/modules/task/hooks/api/use-create-task";
import { useQueryInboxTasks } from "@/modules/task/hooks/api/use-query-inbox-tasks";

export default function Inbox() {
  const [filter, setFilter] = useState<PageFilter>("Date ascending");

  const { mutate: handleCreate } = useCreateTask("inbox");

  const { tasks } = useQueryInboxTasks(filter);

  return (
    <>
      <PageHeader filter={filter} setFilter={setFilter} />
      <PageContainer>
        <h1 className="mb-4">Inbox</h1>
        <div className="flex flex-col">
          {tasks.map((task) => (
            <Task param="inbox" isSortable={false} key={task.id} {...task} />
          ))}
          <CreateTask projectId={null} createTask={handleCreate} order={null} />
        </div>
      </PageContainer>
    </>
  );
}
