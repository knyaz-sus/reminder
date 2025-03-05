import { useEffect, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { taskApi } from "@/modules/task/task-api";
import { PageFilter } from "@/constants/ui";
import { filterTasks } from "../../utils/filter-tasks";

export const useQueryProjectTasks = (projectId: string, filter: PageFilter) => {
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
    tasks: filterTasks(tasks, filter),
    setTasks,
    error,
  };
};
