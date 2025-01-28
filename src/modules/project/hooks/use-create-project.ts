import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuid } from "uuid";
import { useAuth } from "@/modules/auth/hooks/use-auth";
import { createProjectRequestSchema } from "@/types/schemas";
import { addProject } from "../api/add-project";
import { projectQueryOptions } from "../api/project-query-options";
import { useRouter } from "next/navigation";

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const newProjectId = uuid();
  const router = useRouter();
  const { mutateAsync, error } = useMutation({
    mutationFn: addProject,

    async onMutate(newProject) {
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
        (old = []) => {
          return [
            {
              ...newProject,
              id: newProjectId,
              updatedAt: new Date().toISOString(),
              createdAt: new Date().toISOString(),
            },
            ...old,
          ];
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

  const handleCreate = async (name: string) => {
    const newProject = {
      id: newProjectId,
      name,
      adminId: session?.user.id,
    };

    const { success, data } = createProjectRequestSchema.safeParse(newProject);

    if (success) await mutateAsync(data);
    if (newProjectId) router.push(`/app/projects/${newProjectId}`);
  };

  return { handleCreate, error };
};
