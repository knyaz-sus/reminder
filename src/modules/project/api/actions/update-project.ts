"use server";

import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import {
  projectSchema,
  UpdateProjectRequest,
  updateProjectRequestSchema,
} from "@/schemas/project-schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const updateProject = async (updateRequest: UpdateProjectRequest) => {
  try {
    const validatedRequest = updateProjectRequestSchema.parse(updateRequest);

    const supabase = await createServerSupabase();

    const user = await supabase.auth.getUser();
    if (!user) {
      redirect("/auth/login");
    }

    const { data } = await supabase
      .from("projects")
      .update(validatedRequest)
      .eq("id", validatedRequest.id)
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
