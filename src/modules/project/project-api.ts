import { queryOptions } from "@tanstack/react-query";
import { validateUUID } from "@/schemas/utils/validate-uuid";
import { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/create-browser-supabase";
import {
  CreateProjectRequest,
  createProjectRequestSchema,
  DeleteProjectRequest,
  deleteProjectRequestSchema,
  projectSchema,
  projectsSchema,
  UpdateProjectRequest,
  updateProjectRequestSchema,
} from "@/schemas/project-schema";
import { Database } from "@/types/database";

export const projectApi = {
  baseKey: ["projects"],

  getProjectQueryOptions(
    projectId: string | null,
    supabaseClient: SupabaseClient<Database> = supabase
  ) {
    return queryOptions({
      queryFn: async () => {
        try {
          const validatedId = validateUUID(projectId);
          const { data } = await supabaseClient
            .from("projects")
            .select("*")
            .eq("id", validatedId)
            .single()
            .throwOnError();

          return projectSchema.parse(data);
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
      queryKey: ["projects", projectId],
    });
  },

  getAllProjectsQueryOptions(
    supabaseClient: SupabaseClient<Database> = supabase
  ) {
    return queryOptions({
      queryFn: async () => {
        try {
          const {
            data: { session },
          } = await supabaseClient.auth.getSession();
          if (!session) throw Error();
          const { data: projects } = await supabaseClient
            .from("projects")
            .select("*")
            .eq("adminId", session?.user.id)
            .throwOnError();

          return projectsSchema.parse(projects);
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
      queryKey: ["projects"],
    });
  },

  async createProject(projectRequest: CreateProjectRequest) {
    createProjectRequestSchema.parse(projectRequest);

    const { data } = await supabase
      .from("projects")
      .insert(projectRequest)
      .select("*")
      .single()
      .throwOnError();

    return projectSchema.parse(data);
  },

  async deleteProject(deleteRequest: DeleteProjectRequest) {
    const validatedRequest = deleteProjectRequestSchema.parse(deleteRequest);

    await supabase.from("projects").delete().eq("id", validatedRequest.id);

    return { message: "Project deleted succesfully" };
  },

  async updateProject(updateRequest: UpdateProjectRequest) {
    const validatedRequest = updateProjectRequestSchema.parse(updateRequest);

    const { data } = await supabase
      .from("projects")
      .update(validatedRequest)
      .eq("id", validatedRequest.id)
      .select("*")
      .single()
      .throwOnError();

    return projectSchema.parse(data);
  },
};
