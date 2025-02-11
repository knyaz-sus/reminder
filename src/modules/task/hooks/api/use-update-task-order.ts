import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskApi } from "../../task-api";
import { useToast } from "@/hooks/use-toast";

export const useUpdateTaskOrder = (queryKey: string) => {
  const { toast } = useToast();

  const queryClient = useQueryClient();
  const { mutate, error } = useMutation({
    mutationFn: taskApi.updateTaskOrder,

    async onMutate(tasks) {
      await queryClient.cancelQueries({ queryKey: taskApi.baseKey });

      const previousData = queryClient.getQueryData(
        taskApi.getProjectTasksQueryOptions(queryKey).queryKey
      );

      queryClient.setQueryData(
        taskApi.getProjectTasksQueryOptions(queryKey).queryKey,
        () => tasks
      );

      return previousData;
    },

    onError(_, __, previousData) {
      queryClient.setQueryData(
        taskApi.getProjectTasksQueryOptions(queryKey).queryKey,
        previousData
      );
      toast({
        title: "An error occurred while updating task order.",
        variant: "destructive",
      });
    },
  });

  return { mutate, error };
};
