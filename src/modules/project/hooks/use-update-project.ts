import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/modules/auth/hooks/use-auth";
import { projectApi } from "../api/project-api";
import { useToast } from "@/hooks/use-toast";

export const useUpdateProject = () => {
  const { toast } = useToast();
  const { session } = useAuth();

  const queryClient = useQueryClient();
  const { mutate, error } = useMutation({
    mutationFn: projectApi.updateProject,

    async onMutate(updatedProperties) {
      await queryClient.cancelQueries({
        queryKey: projectApi.baseKey,
      });

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

      queryClient.setQueryData(
        projectApi.getprojectApi(updatedProperties.id).queryKey,
        (old) => {
          if (old) return { ...old, ...updatedProperties };
        }
      );

      return previousData;
    },

    onError(_, __, previousData) {
      queryClient.setQueryData(
        projectApi.getAllProjectsQueryOptions(session?.user.id).queryKey,
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
