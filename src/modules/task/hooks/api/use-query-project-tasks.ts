import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { taskApi } from "@/modules/task/task-api";
import { PageFilter } from "@/constants/ui";
import { filterTasks } from "@/modules/task/utils/filter-tasks";

export const useQueryProjectTasks = (projectId: string, filter: PageFilter) => {
  const { data, error } = useQuery({
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
    tasks: tasks ? filterTasks(tasks, filter) : undefined,
    setTasks,
    error,
  };
};
