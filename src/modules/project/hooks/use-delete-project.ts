import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteProjectRequest } from "@/schemas/project-schema";
import { projectApi } from "../project-api";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export const useDeleteProject = () => {
  const { toast } = useToast();
  const pathname = usePathname();
  const router = useRouter();

  const queryClient = useQueryClient();
  const { mutate, error } = useMutation({
    mutationFn: projectApi.deleteProject,

    async onMutate(vars) {
      await queryClient.cancelQueries({
        queryKey: projectApi.baseKey,
      });

      const previousData = queryClient.getQueryData(
        projectApi.getAllProjectsQueryOptions().queryKey
      );

      queryClient.setQueryData(
        projectApi.getAllProjectsQueryOptions().queryKey,
        (old = []) => old.filter((el) => el.id !== vars.id)
      );

      return previousData;
    },
    onError(_, __, previousData) {
      queryClient.setQueryData(
        projectApi.getAllProjectsQueryOptions().queryKey,
        previousData
      );
      toast({
        title: "An error occurred while deleting the project.",
        variant: "destructive",
      });
    },
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: projectApi.getAllProjectsQueryOptions().queryKey,
      });
    },
  });

  const handleDelete = (deleteRequest: DeleteProjectRequest) => {
    if (pathname.includes(deleteRequest.id)) {
      router.replace("/app/today");
    }
    mutate(deleteRequest);
  };

  return { handleDelete, error };
};
