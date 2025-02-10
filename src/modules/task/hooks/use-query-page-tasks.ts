import { useQuery } from "@tanstack/react-query";
import { taskApi } from "../api/task-api";

export const useQueryPageTasks = () => {
  const {
    data: tasks,
    isPending,
    error,
  } = useQuery({
    ...taskApi.getTodayTasksQueryOptions(),
    select(data) {
      return data.sort(
        (a, b) => Number(new Date(a.createdAt)) - Number(new Date(b.createdAt))
      );
    },
  });
  return { tasks, isPending, error };
};
