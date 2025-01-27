"use server";

import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const signUpWithPassword = async (
  name: string,
  email: string,
  password: string
) => {
  const supabase = await createServerSupabase();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });

  if (error) redirect("/auth");

  revalidatePath("/", "layout");
  redirect("/app/today");
};
