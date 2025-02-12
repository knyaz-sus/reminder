"use server";

import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const signInWithPassword = async (email: string, password: string) => {
  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { message: error.message };
  }

  revalidatePath("/", "layout");

  redirect("/app/today");
};
