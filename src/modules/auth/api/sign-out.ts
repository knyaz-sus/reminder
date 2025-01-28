"use server";

import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const signOut = async () => {
  const supabase = await createServerSupabase();

  const { error } = await supabase.auth.signOut();

  if (error) return { error, message: error.message };

  revalidatePath("/", "layout");

  redirect("/");
};
