import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/modules/auth/hooks/use-auth";
import { DeleteProjectRequest } from "@/schemas/project-schema";
import { projectApi } from "../project-api";
import { usePathname } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export const useDeleteProject = () => {
  const { toast } = useToast();
  const { session } = useAuth();
  const pathname = usePathname();

  const queryClient = useQueryClient();
  const { mutate, error } = useMutation({
    mutationFn: projectApi.deleteProject,

    async onMutate(vars) {
      await queryClient.cancelQueries({
        queryKey: projectApi.baseKey,
      });

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
      toast({
        title: "An error occurred while deleting the project.",
        variant: "destructive",
      });
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: projectApi.baseKey });
    },
  });

  const handleDelete = (deleteRequest: DeleteProjectRequest) => {
    if (pathname.includes(deleteRequest.id)) {
      window.history.replaceState(null, "", "/app/today");
    }
    mutate(deleteRequest);
  };

  return { handleDelete, error };
};
