import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { taskApi } from "../api/task-api";

export const useQueryProjectTasks = (projectId: string, filter?: string) => {
  const { data, error } = useQuery({
    ...taskApi.getProjectTasksQueryOptions(projectId),
    select(data) {
      if (filter === "date")
        return data.sort(
          (a, b) =>
            Number(new Date(a.createdAt)) - Number(new Date(b.createdAt))
        );
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
