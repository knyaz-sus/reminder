import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../api/delete-task";
import { taskQueryOptions } from "../api/task-query-options";

export const useDeleteTask = (projectId: string) => {
  const queryClient = useQueryClient();
  const { mutate, error } = useMutation({
    mutationFn: deleteTask,

    async onMutate(id) {
      await queryClient.cancelQueries({ queryKey: taskQueryOptions.baseKey });

      const previousData = queryClient.getQueryData(
        taskQueryOptions.getProjectTasksQueryOptions(projectId).queryKey
      );

      queryClient.setQueryData(
        taskQueryOptions.getProjectTasksQueryOptions(projectId).queryKey,
        (old = []) => old.filter((el) => el.id !== id)
      );

      return previousData;
    },

    onError(_, __, previousData) {
      queryClient.setQueryData(
        taskQueryOptions.getProjectTasksQueryOptions(projectId).queryKey,
        previousData
      );
    },

    onSettled() {
      queryClient.invalidateQueries({ queryKey: taskQueryOptions.baseKey });
    },
  });

  return { mutate, error };
};
