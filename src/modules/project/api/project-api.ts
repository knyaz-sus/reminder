import { queryOptions } from "@tanstack/react-query";
import { validateUUID } from "@/schemas/utils/validate-uuid";
import { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/create-browser-supabase";
import {
  CreateProjectRequest,
  DeleteProjectRequest,
  projectSchema,
  projectsSchema,
  UpdateProjectRequest,
} from "@/schemas/project-schema";
import { createProject } from "./actions/create-project";
import { deleteProject } from "./actions/delete-project";
import { updateProject } from "./actions/update-project";

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

          const validatedData = projectsSchema.parse(projects);
          return validatedData.sort(
            (a, b) =>
              Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
          );
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
      queryKey: ["projects", userId],
    });
  },
  async createProject(projectRequest: CreateProjectRequest) {
    const res = await createProject(projectRequest);
    if (res instanceof Error) throw res;
    else return res;
  },
  async deleteProject(deleteRequest: DeleteProjectRequest) {
    const res = await deleteProject(deleteRequest);
    if (res instanceof Error) throw res;
    else return res;
  },
  async updateProject(updateRequest: UpdateProjectRequest) {
    const res = await updateProject(updateRequest);
    if (res instanceof Error) throw res;
    else return res;
  },
};
