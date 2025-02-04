"use server";

import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import {
  CreateProjectRequest,
  createProjectRequestSchema,
  projectSchema,
} from "@/schemas/project-schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createProject = async (projectRequest: CreateProjectRequest) => {
  try {
    createProjectRequestSchema.parse(projectRequest);

    const supabase = await createServerSupabase();

    const user = await supabase.auth.getUser();
    if (!user) {
      redirect("/auth/login");
    }

    const { data } = await supabase
      .from("projects")
      .insert(projectRequest)
      .select("*")
      .single()
      .throwOnError();

    return projectSchema.parse(data);
  } catch (error) {
    if (error instanceof Error) return error;
  } finally {
    revalidatePath("/", "layout");
  }
};
