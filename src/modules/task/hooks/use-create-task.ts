import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskApi } from "../task-api";
import { Priorities } from "@/constants/ui";
import {
  CreateTaskRequestSchema,
  createTaskRequestSchema,
} from "@/types/schemas";
import { useAuth } from "@/modules/auth/hooks/use-auth";
import { addTask } from "../actions/add-task";

export const useCreateTask = (projectId: string) => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const { mutate, error } = useMutation({
    mutationFn: addTask,

    async onMutate(newTask) {
      await queryClient.cancelQueries({ queryKey: taskApi.baseKey });

      if (!session) return;

      const previousData = queryClient.getQueryData(
        taskApi.getProjectTasksQueryOptions(projectId).queryKey
      );

      queryClient.setQueryData(
        taskApi.getProjectTasksQueryOptions(projectId).queryKey,
        (old = []) => [
          ...old,
          {
            date: null,
            isDone: false,
            updatedAt: new Date().toISOString(),
            priority: "4" as Priorities,
            createdAt: new Date().toISOString(),
            adminId: session.user.id,
            ...newTask,
          },
        ]
      );

      return previousData;
    },

    onError(_, __, previousData) {
      queryClient.setQueryData(
        taskApi.getProjectTasksQueryOptions(projectId).queryKey,
        previousData
      );
    },

    onSettled() {
      queryClient.invalidateQueries({ queryKey: taskApi.baseKey });
    },
  });

  const handleCreate = (newTask: CreateTaskRequestSchema) => {
    const { success, data } = createTaskRequestSchema.safeParse(newTask);
    if (success) mutate(data);
  };

  return { handleCreate, error };
};
