"use server";

import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function resetPassword(password: string, code: string) {
  const supabase = await createServerSupabase();

  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(
    code
  );
  if (exchangeError) {
    return { error: exchangeError.message };
  }
  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");

  redirect("/app");
}
