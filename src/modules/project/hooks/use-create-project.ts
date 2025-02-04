import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/modules/auth/hooks/use-auth";
import {
  CreateProjectRequestSchema,
  createProjectRequestSchema,
} from "@/types/schemas";
import { projectApi } from "../api/project-api";
import { MakeOptional } from "@/types";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export const useCreateProject = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { session } = useAuth();

  const queryClient = useQueryClient();
  const { mutate, error } = useMutation({
    mutationFn: projectApi.createProject,

    async onMutate(newProject) {
      await queryClient.cancelQueries({
        queryKey: projectApi.baseKey,
      });

      const previousData = queryClient.getQueryData(
        projectApi.getAllProjectsQueryOptions(session?.user.id).queryKey
      );

      queryClient.setQueryData(
        projectApi.getAllProjectsQueryOptions(session?.user.id).queryKey,
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
        projectApi.getAllProjectsQueryOptions(session?.user.id).queryKey,
        previousData
      );
      toast({
        title: "An error occurred while creating the project.",
        variant: "destructive",
      });
    },
    onSettled(data) {
      queryClient.invalidateQueries({ queryKey: projectApi.baseKey });
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
