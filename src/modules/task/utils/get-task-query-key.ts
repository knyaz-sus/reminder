import { z } from "zod";
import { taskApi } from "../task-api";

export const getTaskQueryKey = (param: string) => {
  if (z.string().uuid().safeParse(param).success) {
    return taskApi.getProjectTasksQueryOptions(param).queryKey;
  } else if (param === "today") {
    return taskApi.getTodayTasksQueryOptions().queryKey;
  } else if (param === "inbox") {
    return taskApi.getInboxTasksQueryOptions().queryKey;
  } else {
    return taskApi.getDoneTasksQueryOptions().queryKey;
  }
};
