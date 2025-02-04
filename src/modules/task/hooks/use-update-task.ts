import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateTaskRequest } from "@/schemas/task-schema";
import { taskApi } from "../api/task-api";
import { useToast } from "@/hooks/use-toast";

export const useUpdateTask = (queryKey: string) => {
  const { toast } = useToast();

  const queryClient = useQueryClient();
  const { mutate, error } = useMutation({
    mutationFn: taskApi.updateTask,

    async onMutate(updatedProperties) {
      await queryClient.cancelQueries({ queryKey: taskApi.baseKey });

      const previousData = queryClient.getQueryData(
        taskApi.getProjectTasksQueryOptions(queryKey).queryKey
      );

      queryClient.setQueryData(
        taskApi.getProjectTasksQueryOptions(queryKey).queryKey,
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
        taskApi.getProjectTasksQueryOptions(queryKey).queryKey,
        previousData
      );
      toast({
        title: "An error occurred while updating task.",
        variant: "destructive",
      });
    },

    onSettled() {
      queryClient.invalidateQueries({ queryKey: taskApi.baseKey });
    },
  });

  const handleUpdate = (updateProperties: UpdateTaskRequest) => {
    mutate(updateProperties);
  };

  const handleDone = (id: string, isDone: boolean) => mutate({ id, isDone });

  return { handleUpdate, handleDone, error };
};
