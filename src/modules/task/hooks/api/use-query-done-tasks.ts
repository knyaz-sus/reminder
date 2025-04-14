import {  useSuspenseQuery } from "@tanstack/react-query";
import { taskApi } from "@/modules/task/task-api";

export const useQueryDoneTasks = () => {
  const {
    data: tasks,
    isPending,
    error,
  } = useSuspenseQuery({
    ...taskApi.getDoneTasksQueryOptions(),
    select(data) {
      return data.sort(
        (a, b) => Number(new Date(a.createdAt)) - Number(new Date(b.createdAt))
      );
    },
  });
  return { tasks, isPending, error };
};
