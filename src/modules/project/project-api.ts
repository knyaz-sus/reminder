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

export const projectApi = {
  baseKey: ["projects"],

  getProjectQueryOptions(
    projectId: string | undefined,
    supabaseClient: SupabaseClient = supabase
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
    userId: string | undefined,
    supabaseClient: SupabaseClient = supabase
  ) {
    return queryOptions({
      queryFn: async () => {
        try {
          const validatedId = validateUUID(userId);
          const { data: projects } = await supabaseClient
            .from("projects")
            .select("*")
            .eq("adminId", validatedId)
            .throwOnError();

          return projectsSchema.parse(projects);
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
      queryKey: ["projects", userId],
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
