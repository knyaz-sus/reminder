import { useSuspenseQuery } from "@tanstack/react-query";
import { taskApi } from "@/modules/task/task-api";
import { PageFilter } from "@/constants/ui";
import { filterTasks } from "@/modules/task/utils/filter-tasks";

export const useQueryInboxTasks = (filter: PageFilter) => {
  const {
    data: tasks,
    isPending,
    error,
  } = useSuspenseQuery({
    ...taskApi.getInboxTasksQueryOptions(),
    select(data) {
      return filterTasks(data, filter);
    },
  });
  return { tasks, isPending, error };
};
