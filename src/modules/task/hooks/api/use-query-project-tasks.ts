import { useEffect, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { taskApi } from "@/modules/task/task-api";

export const useQueryProjectTasks = (projectId: string) => {
  const { data, error } = useSuspenseQuery({
    ...taskApi.getProjectTasksQueryOptions(projectId),
  });

  const [tasks, setTasks] = useState(data);
  useEffect(() => {
    const dataString = JSON.stringify(data);
    const allDecksString = JSON.stringify(tasks);
    if (tasks && dataString !== allDecksString) {
      setTasks(data);
    }
  }, [data, tasks]);

  return {
    tasks: tasks?.sort((a, b) => {
      const aOrder = a.order as number;
      const bOrder = b.order as number;
      return aOrder - bOrder;
    }),
    setTasks,
    error,
  };
};
