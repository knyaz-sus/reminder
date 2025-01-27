import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectApi } from "../project-api";
import { useAuth } from "@/modules/auth/hooks/use-auth";
import {
  DeleteProjectRequestSchema,
  deleteProjectRequestSchema,
} from "@/types/schemas";
import { deleteProject } from "../actions/delete-project";

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();

  const { mutate, error } = useMutation({
    mutationFn: deleteProject,

    async onMutate(vars) {
      await queryClient.cancelQueries({ queryKey: projectApi.baseKey });

      const previousData = queryClient.getQueryData(
        projectApi.getAllProjectsQueryOptions(session?.user.id).queryKey
      );

      queryClient.setQueryData(
        projectApi.getAllProjectsQueryOptions(session?.user.id).queryKey,
        (old = []) => old.filter((el) => el.id !== vars.id)
      );

      return previousData;
    },
    onError(_, __, previousData) {
      queryClient.setQueryData(
        projectApi.getAllProjectsQueryOptions(session?.user.id).queryKey,
        previousData
      );
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: projectApi.baseKey });
    },
  });

  const handleDelete = (deleteRequest: DeleteProjectRequestSchema) => {
    const { success, data } =
      deleteProjectRequestSchema.safeParse(deleteRequest);
    if (success) mutate(data);
  };

  return { handleDelete, error };
};
