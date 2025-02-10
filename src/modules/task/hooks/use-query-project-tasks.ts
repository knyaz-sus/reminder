import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { taskApi } from "../api/task-api";

export const useQueryProjectTasks = (projectId: string) => {
  const { data, error } = useQuery({
    ...taskApi.getProjectTasksQueryOptions(projectId),
    select(data) {
      return data.sort((a, b) => {
        const aOrder = a.order as number;
        const bOrder = b.order as number;
        return aOrder - bOrder;
      });
    },
  });

  const [tasks, setTasks] = useState(data);
  useEffect(() => setTasks(data), [data]);

  return { tasks, setTasks, error };
};
