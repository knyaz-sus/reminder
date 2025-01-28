import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/modules/auth/hooks/use-auth";
import {
  DeleteProjectRequestSchema,
  deleteProjectRequestSchema,
} from "@/types/schemas";
import { deleteProject } from "../api/delete-project";
import { projectQueryOptions } from "../api/project-query-options";
import { usePathname } from "next/navigation";

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const pathname = usePathname();

  const { mutate, error } = useMutation({
    mutationFn: deleteProject,

    async onMutate(vars) {
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
        (old = []) => old.filter((el) => el.id !== vars.id)
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

  const handleDelete = (deleteRequest: DeleteProjectRequestSchema) => {
    if (pathname.includes(deleteRequest.id)) {
      window.history.replaceState(null, "", "/app/today");
    }
    const { success, data } =
      deleteProjectRequestSchema.safeParse(deleteRequest);
    if (success) mutate(data);
  };

  return { handleDelete, error };
};
