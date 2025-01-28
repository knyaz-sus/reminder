import { useQuery } from "@tanstack/react-query";
import { taskQueryOptions } from "../api/task-query-options";

export const useQueryPageTasks = (page: "inbox" | "today") => {
  const {
    data: tasks,
    isPending,
    error,
  } = useQuery({
    ...taskQueryOptions.getProjectTasksQueryOptions(page),
    select(data) {
      return data?.sort(
        (a, b) => Number(new Date(a.createdAt)) - Number(new Date(b.createdAt))
      );
    },
  });
  return { tasks, isPending, error };
};
