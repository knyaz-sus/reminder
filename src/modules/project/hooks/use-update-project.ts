import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectApi } from "../project-api";
import {
  updateProjectRequestSchema,
  UpdateProjectRequestSchema,
} from "@/types/schemas";
import { useAuth } from "@/modules/auth/hooks/use-auth";

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();

  const { mutate, error } = useMutation({
    mutationFn: projectApi.updateProject,

    async onMutate(updatedProperties) {
      await queryClient.cancelQueries({ queryKey: projectApi.baseKey });

      const previousData = queryClient.getQueryData(
        projectApi.getAllProjectsQueryOptions(session?.user.id).queryKey
      );

      queryClient.setQueryData(
        projectApi.getAllProjectsQueryOptions(session?.user.id).queryKey,
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
        projectApi.getAllProjectsQueryOptions(session?.user.id).queryKey,
        previousData
      );
    },

    onSettled() {
      queryClient.invalidateQueries({ queryKey: projectApi.baseKey });
    },
  });

  const handleUpdate = (updateProperties: UpdateProjectRequestSchema) => {
    const { data, success } =
      updateProjectRequestSchema.safeParse(updateProperties);
    if (success) mutate(data);
  };

  return { handleUpdate, error };
};
