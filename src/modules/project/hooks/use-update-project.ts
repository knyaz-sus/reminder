import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectApi } from "../project-api";
import { useToast } from "@/hooks/use-toast";

export const useUpdateProject = () => {
  const { toast } = useToast();

  const queryClient = useQueryClient();
  const { mutate, error } = useMutation({
    mutationFn: projectApi.updateProject,

    async onMutate(updatedProperties) {
      await queryClient.cancelQueries({
        queryKey: projectApi.baseKey,
      });

      const previousData = queryClient.getQueryData(
        projectApi.getAllProjectsQueryOptions().queryKey
      );

      queryClient.setQueryData(
        projectApi.getAllProjectsQueryOptions().queryKey,
        (old = []) =>
          old.map((el) => {
            if (el.id === updatedProperties.id) {
              return { ...el, ...updatedProperties };
            }
            return el;
          })
      );

      queryClient.setQueryData(
        projectApi.getProjectQueryOptions(updatedProperties.id).queryKey,
        (old) => {
          if (old) return { ...old, ...updatedProperties };
        }
      );

      return previousData;
    },

    onError(_, __, previousData) {
      queryClient.setQueryData(
        projectApi.getAllProjectsQueryOptions().queryKey,
        previousData
      );
      toast({
        title: "An error occurred while updating the project.",
        variant: "destructive",
      });
    },

    onSettled() {
      queryClient.invalidateQueries({ queryKey: projectApi.baseKey });
    },
  });

  return { mutate, error };
};
