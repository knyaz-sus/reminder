"use client";

import { useQuery } from "@tanstack/react-query";
import { useQueryProjectTasks } from "@/modules/task/hooks/api/use-query-project-tasks";
import { useTaskSensors } from "@/modules/task/hooks/use-task-sensors";
import { useUpdateTaskOrder } from "@/modules/task/hooks/api/use-update-task-order";
import { closestCorners, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CreateTask } from "@/modules/task/components/create-task";
import { useCreateTask } from "@/modules/task/hooks/api/use-create-task";
import { Task } from "@/modules/task/components/task";
import { useParams } from "next/navigation";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { projectApi } from "@/modules/project/project-api";

export function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const sensors = useTaskSensors();

  const { data: project } = useQuery({
    ...projectApi.getProjectQueryOptions(projectId),
  });

  const { tasks, setTasks } = useQueryProjectTasks(projectId);

  const { mutate: handleUpdateOrder } = useUpdateTaskOrder(projectId);

  const { mutate: handleCreate } = useCreateTask(projectId);

  if (!tasks) return <div>Loading...</div>;

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id);
      const newIndex = tasks.findIndex((task) => task.id === over.id);

      const updatedTasks = arrayMove(tasks, oldIndex, newIndex).map(
        (task, i) => {
          task.order = i + 1;
          return task;
        }
      );
      setTasks(updatedTasks);
      handleUpdateOrder(updatedTasks);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToWindowEdges]}
    >
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col flex-auto max-w-[85vw] lg:max-w-3xl">
          <h1 className="mb-4 overflow-hidden text-ellipsis">
            {project?.name}
          </h1>
          <div className="flex flex-col">
            {tasks.map((task) => (
              <Task
                isSortable
                param={task.projectId as string}
                key={task.id}
                {...task}
              />
            ))}
            <CreateTask
              projectId={projectId}
              createTask={handleCreate}
              order={tasks.length + 1}
            />
          </div>
        </div>
      </SortableContext>
    </DndContext>
  );
}
