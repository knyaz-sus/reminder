"use server";

import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import { projectSchema, UpdateProjectRequestSchema } from "@/types/schemas";
import { revalidatePath } from "next/cache";

export const updateProject = async (project: UpdateProjectRequestSchema) => {
  try {
    const supabase = await createServerSupabase();
    project.id = "";
    const { data } = await supabase
      .from("projects")
      .update(project)
      .eq("id", project.id)
      .select("*")
      .throwOnError();

    revalidatePath("/", "layout");
    return projectSchema.parse(data);
  } catch (error) {
    revalidatePath("/", "layout");
    if (error instanceof Error) {
      error.cause = { nextNoDigest: true, originalCause: error.cause };
      throw error;
    }
  }
};
