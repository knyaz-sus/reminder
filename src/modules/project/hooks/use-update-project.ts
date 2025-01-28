import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateProjectRequestSchema,
  UpdateProjectRequestSchema,
} from "@/types/schemas";
import { useAuth } from "@/modules/auth/hooks/use-auth";
import { projectQueryOptions } from "../api/project-query-options";
import { updateProject } from "../api/update-project";

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();

  const { mutate, error } = useMutation({
    mutationFn: updateProject,

    async onMutate(updatedProperties) {
      await queryClient.cancelQueries({
        queryKey: projectQueryOptions.baseKey,
      });

      const previousData = queryClient.getQueryData(
        projectQueryOptions.getAllProjectsQueryOptions(session?.user.id)
          .queryKey
      );

      queryClient.setQueryData(
        projectQueryOptions.getAllProjectsQueryOptions(session?.user.id)
          .queryKey,
        (old = []) =>
          old.map((el) => {
            if (el.id === updatedProperties.id) {
              return { ...el, ...updatedProperties };
            }
            return el;
          })
      );

      queryClient.setQueryData(
        projectQueryOptions.getProjectQueryOptions(updatedProperties.id)
          .queryKey,
        (old) => {
          if (old) return { ...old, ...updatedProperties };
        }
      );

      return previousData;
    },

    onError(_, __, previousData) {
      queryClient.setQueryData(
        projectQueryOptions.getAllProjectsQueryOptions(session?.user.id)
          .queryKey,
        previousData
      );
    },

    onSettled() {
      queryClient.invalidateQueries({ queryKey: projectQueryOptions.baseKey });
    },
  });

  const handleUpdate = (updateProperties: UpdateProjectRequestSchema) => {
    const { data, success } =
      updateProjectRequestSchema.safeParse(updateProperties);
    if (success) mutate(data);
  };

  return { handleUpdate, error };
};
