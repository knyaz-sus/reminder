import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { userApi } from "@/api/user-api";

export const useUpdateUser = () => {
  const { toast } = useToast();

  const queryClient = useQueryClient();
  const { mutate, error } = useMutation({
    mutationFn: userApi.updateUser,

    async onMutate(updatedProperties) {
      await queryClient.cancelQueries({
        queryKey: userApi.baseKey,
      });

      const previousData = queryClient.getQueryData(
        userApi.getUserQueryOptions().queryKey
      );

      queryClient.setQueryData(
        userApi.getUserQueryOptions().queryKey,
        (old) => {
          if (old) return { ...old, ...updatedProperties };
        }
      );

      return previousData;
    },

    onError(_, __, previousData) {
      queryClient.setQueryData(
        userApi.getUserQueryOptions().queryKey,
        previousData
      );
      toast({
        title: "An error occurred while updating the username.",
        variant: "destructive",
      });
    },

    onSettled() {
      queryClient.invalidateQueries({ queryKey: userApi.baseKey });
    },
  });

  return { mutate, error };
};
