import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/modules/auth/hooks/use-auth";
import {
  CreateProjectRequestSchema,
  createProjectRequestSchema,
} from "@/types/schemas";
import { createProject } from "../api/create-project";
import { projectQueryOptions } from "../api/project-query-options";
import { MakeOptional } from "@/types";
import { useRouter } from "next/navigation";

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const router = useRouter();

  const { mutate, error } = useMutation({
    mutationFn: createProject,

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
    onSettled(data) {
      queryClient.invalidateQueries({ queryKey: projectQueryOptions.baseKey });
      if (data) router.push(`/app/projects/${data.id}`);
    },
  });

  const handleCreate = async (
    createRequest: MakeOptional<CreateProjectRequestSchema, "adminId">
  ) => {
    const { success, data } = createProjectRequestSchema.safeParse({
      ...createRequest,
      adminId: session?.user.id,
    });

    if (success) mutate(data);
  };

  return { handleCreate, error };
};
