import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tasks, tasksSchema } from "@/types/schemas";
import { updateTaskOrder } from "../api/update-task-order";
import { taskQueryOptions } from "../api/task-query-options";

export const useUpdateTaskOrder = (queryKey: string) => {
  const queryClient = useQueryClient();

  const { mutate, error } = useMutation({
    mutationFn: updateTaskOrder,

    async onMutate(tasks) {
      await queryClient.cancelQueries({ queryKey: taskQueryOptions.baseKey });

      const previousData = queryClient.getQueryData(
        taskQueryOptions.getProjectTasksQueryOptions(queryKey).queryKey
      );

      queryClient.setQueryData(
        taskQueryOptions.getProjectTasksQueryOptions(queryKey).queryKey,
        () => tasks
      );

      return previousData;
    },

    onError(_, __, previousData) {
      queryClient.setQueryData(
        taskQueryOptions.getProjectTasksQueryOptions(queryKey).queryKey,
        previousData
      );
    },

    onSettled() {
      queryClient.invalidateQueries({ queryKey: taskQueryOptions.baseKey });
    },
  });

  const handleUpdateOrder = (tasks: Tasks) => {
    const { data: validatedTasks, success } = tasksSchema.safeParse(tasks);
    if (success) mutate(validatedTasks);
  };

  return { handleUpdateOrder, error };
};
