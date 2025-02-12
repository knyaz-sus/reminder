import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Priorities } from "@/constants/ui";
import { useAuth } from "@/modules/auth/hooks/use-auth";
import { taskApi } from "../../task-api";
import { useToast } from "@/hooks/use-toast";
import { getTaskQueryKey } from "../../utils/get-task-query-key";

export const useCreateTask = (param: string) => {
  const { toast } = useToast();
  const { session } = useAuth();

  const queryKey = getTaskQueryKey(param);

  const queryClient = useQueryClient();
  const { mutate, error } = useMutation({
    mutationFn: taskApi.createTask,

    async onMutate(newTask) {
      await queryClient.cancelQueries({ queryKey: taskApi.baseKey });

      if (!session) return;

      const previousData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old = []) => [
        ...old,
        {
          date: null,
          isDone: false,
          updatedAt: new Date().toISOString(),
          priority: "4" as Priorities,
          createdAt: new Date().toISOString(),
          adminId: session.user.id,
          doneAt: null,
          ...newTask,
        },
      ]);

      return previousData;
    },

    onError(_, __, previousData) {
      queryClient.setQueryData(queryKey, previousData);
      toast({
        title: "An error occurred while adding the task.",
        variant: "destructive",
      });
    },

    onSettled() {
      queryClient.invalidateQueries({
        queryKey: taskApi.baseKey,
      });
    },
  });

  return { mutate, error };
};
