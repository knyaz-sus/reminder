import { supabase } from "@/lib/supabase/create-browser-supabase";
import { tasksSchema } from "@/types/schemas";
import { SupabaseClient } from "@supabase/supabase-js";
import { queryOptions } from "@tanstack/react-query";
import { unstable_cache } from "next/cache";

export const taskQueryOptions = {
  baseKey: ["tasks"],
  
  getProjectTasksQueryOptions(
    param: string,
    supabaseClient: SupabaseClient = supabase
  ) {
    return queryOptions({
      queryKey: ["tasks", param],
      queryFn: unstable_cache(async () => {
        try {
          const { data } = await supabaseClient
            .from("tasks")
            .select("*")
            .eq("projectId", param)
            .throwOnError();

          const validatedData = tasksSchema.parse(data);
          return validatedData.sort((a, b) => {
            const aOrder = a.order as number;
            const bOrder = b.order as number;
            return aOrder - bOrder;
          });
        } catch (error) {
          console.log(error);
        }
      }),
    });
  },
};