import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateProjectRequest } from "@/schemas/project-schema";
import { projectApi } from "@/modules/project/project-api";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase/create-browser-supabase";

export const useCreateProject = () => {
  const { toast } = useToast();
  const router = useRouter();

  const queryClient = useQueryClient();
  const { mutate, error } = useMutation({
    mutationFn: projectApi.createProject,

    async onMutate(newProject) {
      await queryClient.cancelQueries({
        queryKey: projectApi.baseKey,
      });

      const previousData = queryClient.getQueryData(
        projectApi.getAllProjectsQueryOptions().queryKey
      );
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) return previousData;

      queryClient.setQueryData(
        projectApi.getAllProjectsQueryOptions().queryKey,
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
        projectApi.getAllProjectsQueryOptions().queryKey,
        previousData
      );
      toast({
        title: "An error occurred while creating the project.",
        variant: "destructive",
      });
    },
    onSettled(_, error, variables) {
      queryClient.invalidateQueries({ queryKey: projectApi.baseKey });
      if (!error) router.push(`/app/projects/${variables.id}`);
    },
  });

  const handleCreate = async (createRequest: CreateProjectRequest) => {
    mutate(createRequest);
  };

  return { handleCreate, error };
};
