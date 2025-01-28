import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { taskQueryOptions } from "../api/task-query-options";

export const useQueryProjectTasks = (projectId: string) => {
  const { data, error } = useQuery({
    ...taskQueryOptions.getProjectTasksQueryOptions(projectId),
  });

  const [tasks, setTasks] = useState(data);
  useEffect(() => setTasks(data), [data]);

  return { tasks, setTasks, error };
};
