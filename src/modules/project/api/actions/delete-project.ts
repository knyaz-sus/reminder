"use server";

import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import { DeleteProjectRequestSchema } from "@/types/schemas";
import { validateUUID } from "@/utils/validate-uuid";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteProject = async ({
  id,
  adminId,
}: DeleteProjectRequestSchema) => {
  try {
    const validatedProjectId = validateUUID(id);
    const validatedAdminId = validateUUID(adminId);
    const supabase = await createServerSupabase();

    const user = await supabase.auth.getUser();
    if (!user) redirect("/auth/login");

    if (user.data.user?.id === validatedAdminId) {
      await supabase.from("projects").delete().eq("id", validatedProjectId);
    }
  } catch (error) {
    if (error instanceof Error) return error;
  } finally {
    revalidatePath("/", "layout");
  }
};
