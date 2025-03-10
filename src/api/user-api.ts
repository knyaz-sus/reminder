import { supabase } from "@/lib/supabase/create-browser-supabase";
import { userSchema } from "@/schemas/user-schema";
import { Database } from "@/types/database";
import { SupabaseClient } from "@supabase/supabase-js";
import { queryOptions } from "@tanstack/react-query";

export const userApi = {
  getUserQueryOptions(supabaseClient: SupabaseClient<Database> = supabase) {
    return queryOptions({
      queryKey: ["user"],
      queryFn: async () => {
        try {
          const {
            data: { session },
          } = await supabaseClient.auth.getSession();
          if (!session) throw new Error("Auth error while getting user");

          const { data } = await supabaseClient
            .from("users")
            .select("*")
            .eq("id", session.user.id)
            .single()
            .throwOnError();

          return userSchema.parse(data);
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    });
  },
};
