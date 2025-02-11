import { z } from "zod";
import { taskApi } from "../task-api";

export const getTaskQueryKey = (param: string) => {
  if (z.string().uuid().safeParse(param).success) {
    return taskApi.getProjectTasksQueryOptions(param).queryKey;
  } else if (param === "today") {
    return taskApi.getTodayTasksQueryOptions().queryKey;
  } else {
    return taskApi.getProjectTasksQueryOptions("inbox").queryKey;
  }
};
