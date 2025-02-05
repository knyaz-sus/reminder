import { useQuery } from "@tanstack/react-query";
import { taskApi } from "../api/task-api";

export const useQueryPageTasks = () => {
  const {
    data: tasks,
    isPending,
    error,
  } = useQuery({
    ...taskApi.getTodayTasksQueryOptions(),
  });
  return { tasks, isPending, error };
};
