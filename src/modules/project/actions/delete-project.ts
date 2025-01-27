"use server";

import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import { DeleteProjectRequestSchema } from "@/types/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteProject = async ({
  id,
  adminId,
}: DeleteProjectRequestSchema) => {
  const supabase = await createServerSupabase();

  const user = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  revalidatePath("/");
  if (user.data.user?.id === adminId)
    await supabase.from("projects").delete().eq("id", id);
};
