"use server";

import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import { CreateProjectRequestSchema, projectSchema } from "@/types/schemas";
import { revalidatePath } from "next/cache";

export const addProject = async (
  projectRequest: CreateProjectRequestSchema
) => {
  try {
    const supabase = await createServerSupabase();

    const { data } = await supabase
      .from("projects")
      .insert(projectRequest)
      .select("*")
      .single()
      .throwOnError();

    revalidatePath("/", "layout");

    return projectSchema.parse(data);
  } catch (error) {
    if (error instanceof Error) {
      error.cause = { nextNoDigest: true, originalCause: error.cause };
      throw error;
    }
  }
};
