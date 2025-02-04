"use server";

import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import { validateUUID } from "@/schemas/utils/validate-uuid";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteTask = async (id: string) => {
  try {
    const validatedId = validateUUID(id);

    const supabase = await createServerSupabase();

    const user = await supabase.auth.getUser();
    if (!user) {
      redirect("/auth/login");
    }

    await supabase.from("tasks").delete().eq("id", validatedId).throwOnError();

    return { message: "Task deleted succesfully" };
  } catch (error) {
    if (error instanceof Error) return error;
  } finally {
    revalidatePath("/", "layout");
  }
};
