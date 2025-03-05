import { useQuery } from "@tanstack/react-query";
import { taskApi } from "@/modules/task/task-api";
import { PageFilter } from "@/constants/ui";
import { filterTasks } from "../../utils/filter-tasks";

export const useQueryTodayTasks = (filter: PageFilter) => {
  const {
    data: tasks,
    isPending,
    error,
  } = useQuery({
    ...taskApi.getTodayTasksQueryOptions(),
    select(data) {
      return filterTasks(data, filter);
    },
  });
  return { tasks, isPending, error };
};
