import { supabase } from "@/lib/supabase/create-browser-supabase";
import { userRowSchema } from "@/types/schemas";
import { validateUUID } from "@/utils/validateUUID";
import { queryOptions } from "@tanstack/react-query";

export const userApi = {
  getUserQueryOptions(id: string | undefined) {
    return queryOptions({
      queryKey: ["user"],
      queryFn: async () => {
        const validatedId = validateUUID(id);
        const { data } = await supabase
          .from("users")
          .select("*")
          .eq("id", validatedId)
          .single()
          .throwOnError();
        console.log(data);
        return userRowSchema.parse(data);
      },
    });
  },
};
