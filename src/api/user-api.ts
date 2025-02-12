import { supabase } from "@/lib/supabase/create-browser-supabase";
import { userSchema } from "@/schemas/user-schema";
import { validateUUID } from "@/schemas/utils/validate-uuid";
import { Database } from "@/types/database";
import { SupabaseClient } from "@supabase/supabase-js";
import { queryOptions } from "@tanstack/react-query";

export const userApi = {
  getUserQueryOptions(
    id: string | undefined,
    supabaseClient: SupabaseClient<Database> = supabase
  ) {
    return queryOptions({
      queryKey: ["user"],
      queryFn: async () => {
        const validatedId = validateUUID(id);

        const { data } = await supabaseClient
          .from("users")
          .select("*")
          .eq("id", validatedId)
          .single()
          .throwOnError();

        return userSchema.parse(data);
      },
    });
  },
};
