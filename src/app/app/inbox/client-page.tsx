"use client";

import { CreateTask } from "@/modules/task/components/create-task";
import { Task } from "@/modules/task/components/task";
import { useCreateTask } from "@/modules/task/hooks/api/use-create-task";
import { useQueryInboxTasks } from "@/modules/task/hooks/api/use-query-inbox-tasks";

export default function Inbox() {
  const { mutate: handleCreate } = useCreateTask("inbox");

  const { tasks } = useQueryInboxTasks();

  return (
    <div className="flex flex-col flex-auto max-w-[85vw] lg:max-w-3xl">
      <h1 className="mb-4">Inbox</h1>
      <div className="flex flex-col">
        {tasks?.map((task) => (
          <Task param="inbox" isSortable={false} key={task.id} {...task} />
        ))}
        <CreateTask projectId={null} createTask={handleCreate} order={null} />
      </div>
    </div>
  );
}
