import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  UpdateTaskRequestSchema,
  updateTaskRequestSchema,
} from "@/types/schemas";
import { taskQueryOptions } from "../api/task-query-options";
import { updateTask } from "../api/update-task";

export const useUpdateTask = (queryKey: string) => {
  const queryClient = useQueryClient();

  const { mutate, error } = useMutation({
    mutationFn: updateTask,

    async onMutate(updatedProperties) {
      await queryClient.cancelQueries({ queryKey: taskQueryOptions.baseKey });

      const previousData = queryClient.getQueryData(
        taskQueryOptions.getProjectTasksQueryOptions(queryKey).queryKey
      );

      queryClient.setQueryData(
        taskQueryOptions.getProjectTasksQueryOptions(queryKey).queryKey,
        (old = []) =>
          old.map((el) => {
            if (el.id === updatedProperties.id) {
              return { ...el, ...updatedProperties };
            }
            return el;
          })
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

  const handleUpdate = (updateProperties: UpdateTaskRequestSchema) => {
    const { data, success } =
      updateTaskRequestSchema.safeParse(updateProperties);
    if (success) mutate(data);
  };

  const handleDone = (id: string, isDone: boolean) => mutate({ id, isDone });

  return { handleUpdate, handleDone, error };
};
