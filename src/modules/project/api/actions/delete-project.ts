"use server";

import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import {
  DeleteProjectRequest,
  deleteProjectRequestSchema,
} from "@/schemas/project-schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteProject = async (deleteRequest: DeleteProjectRequest) => {
  try {
    const validatedRequest = deleteProjectRequestSchema.parse(deleteRequest);

    const supabase = await createServerSupabase();

    const user = await supabase.auth.getUser();
    if (!user) {
      redirect("/auth/login");
    }

    if (user.data.user?.id === validatedRequest.adminId) {
      await supabase.from("projects").delete().eq("id", validatedRequest.id);
    }

    return { message: "Project deleted succesfully" };
  } catch (error) {
    if (error instanceof Error) return error;
  } finally {
    revalidatePath("/", "layout");
  }
};
