import { queryOptions } from "@tanstack/react-query";
import { validateUUID } from "@/utils/validate-uuid";
import { unstable_cache } from "next/cache";
import { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/create-browser-supabase";
import { projectSchema, projectsSchema } from "@/types/schemas";

export const projectQueryOptions = {
  baseKey: ["projects"],

  getProjectQueryOptions(
    projectId: string | undefined,
    supabaseClient: SupabaseClient = supabase
  ) {
    return queryOptions({
      queryFn: unstable_cache(async () => {
        const validatedId = validateUUID(projectId);
        const { data } = await supabaseClient
          .from("projects")
          .select("*")
          .eq("id", validatedId)
          .single()
          .throwOnError();

        return projectSchema.parse(data);
      }),
      queryKey: ["projects", projectId],
    });
  },

  getAllProjectsQueryOptions(
    userId: string | undefined,
    supabaseClient: SupabaseClient = supabase
  ) {
    return queryOptions({
      queryFn: unstable_cache(async () => {
        try {
          const validatedId = validateUUID(userId);
          const { data: projects } = await supabaseClient
            .from("projects")
            .select("*")
            .eq("adminId", validatedId)
            .throwOnError();

          const validatedData = projectsSchema.parse(projects);
          return validatedData.sort(
            (a, b) =>
              Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
          );
        } catch (error) {
          console.log(error);
        }
      }),
      queryKey: ["projects", userId],
    });
  },
};
