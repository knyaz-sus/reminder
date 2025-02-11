import { useQuery } from "@tanstack/react-query";
import { taskApi } from "../../task-api";

export const useQueryInboxTasks = () => {
  const {
    data: tasks,
    isPending,
    error,
  } = useQuery({
    ...taskApi.getInboxTasksQueryOptions(),
    select(data) {
      return data.sort(
        (a, b) => Number(new Date(a.createdAt)) - Number(new Date(b.createdAt))
      );
    },
  });
  return { tasks, isPending, error };
};
