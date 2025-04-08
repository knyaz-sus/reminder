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
          if (!projectId) return null;
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
          const { data: projects, error } = await supabaseClient.rpc(
            "get_all_user_projects"
          );
          if (error) {
            throw Error("Error while getting projects");
          }

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

    const { error: projectsError } = await supabase
      .from("projects")
      .insert(projectRequest);

    const { error: membersError } = await supabase
      .from("project_members")
      .insert({
        projectId: projectRequest.id,
        role: "admin",
      });

    if (projectsError || membersError) {
      throw Error("Error creating project");
    }
  },

  async deleteProject(deleteRequest: DeleteProjectRequest) {
    try {
      const validatedRequest = deleteProjectRequestSchema.parse(deleteRequest);

      await supabase.from("projects").delete().eq("id", validatedRequest.id);

      return { message: "Project deleted succesfully" };
    } catch (error) {
      console.log(error);
      throw error;
    }
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
