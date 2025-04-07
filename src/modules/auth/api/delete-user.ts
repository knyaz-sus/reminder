"use server";

import { createDangerousSupabase } from "@/lib/supabase/create-dangerous-supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteUser() {
  const supabase = await createDangerousSupabase();

  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/auth/signin");

  const { error } = await supabase.auth.admin.deleteUser(data.user.id);

  if (error) {
    console.log(error);
    return { error: "An error occurred while deleting account." };
  }

  revalidatePath("/", "layout");

  redirect("/auth/signin");
}
