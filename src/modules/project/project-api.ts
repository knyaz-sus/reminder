import { z } from "zod";
import {
  CreateProjectRequestSchema,
  Project,
  projectSchema,
  projectsSchema,
  UpdateProjectRequestSchema,
} from "@/types/schemas";
import { QueryClient, queryOptions } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/create-browser-supabase";
import { validateUUID } from "@/utils/validateUUID";
import { unstable_cache } from "next/cache";

export const projectApi = {
  baseKey: ["projects"],

  getProjectQueryOptions(projectId: string | undefined) {
    return queryOptions({
      queryFn: unstable_cache(async () => {
        const validatedId = validateUUID(projectId);
        const { data } = await supabase
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
    queryClient?: QueryClient
  ) {
    return queryOptions({
      queryFn: async () => {
        const validatedId = z.string().uuid().parse(userId);
        const { data: projects } = await supabase
          .from("projects")
          .select("*")
          .eq("adminId", validatedId)
          .throwOnError();

        projects?.forEach((project) =>
          queryClient?.setQueryData<Project>(["projects", project.id], project)
        );
        return projectsSchema.parse(projects);
      },
      queryKey: ["projects", userId],
    });
  },

  async addProject(projectRequest: CreateProjectRequestSchema) {
    const { data } = await supabase
      .from("projects")
      .insert(projectRequest)
      .select("*")
      .single()
      .throwOnError();

    const validatedNewProject = projectSchema.parse(data);
    return validatedNewProject;
  },

  async updateProject(project: UpdateProjectRequestSchema) {
    try {
      const { data } = await supabase
        .from("projects")
        .update(project)
        .eq("id", project.id)
        .select("*")
        .throwOnError();

      const validatedData = projectSchema.parse(data);
      return validatedData;
    } catch (error) {
      if (error instanceof Error) return { error, message: error.message };
    }
  },
};
