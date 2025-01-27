import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskApi } from "../task-api";
import { Tasks, tasksSchema } from "@/types/schemas";

export const useUpdateTaskOrder = (queryKey: string) => {
  const queryClient = useQueryClient();

  const { mutate, error } = useMutation({
    mutationFn: taskApi.updateOrder,

    async onMutate(tasks) {
      await queryClient.cancelQueries({ queryKey: taskApi.baseKey });

      const previousData = queryClient.getQueryData(
        taskApi.getProjectTasksQueryOptions(queryKey).queryKey
      );

      queryClient.setQueryData(
        taskApi.getProjectTasksQueryOptions(queryKey).queryKey,
        () =>
          tasks.sort((a, b) => {
            const aOrder = a.order as number;
            const bOrder = b.order as number;
            return aOrder - bOrder;
          })
      );

      return previousData;
    },

    onError(_, __, previousData) {
      queryClient.setQueryData(
        taskApi.getProjectTasksQueryOptions(queryKey).queryKey,
        previousData
      );
    },

    onSettled() {},
  });

  const handleUpdateOrder = (tasks: Tasks) => {
    const { data: validatedTasks, success } = tasksSchema.safeParse(tasks);
    if (success) mutate(validatedTasks);
  };

  return { handleUpdateOrder, error };
};
