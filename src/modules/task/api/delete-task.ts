"use server";

import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import { validateUUID } from "@/utils/validate-uuid";
import { revalidatePath } from "next/cache";

export const deleteTask = async (id: string) => {
  try {
    const validatedId = validateUUID(id);

    const supabase = await createServerSupabase();
    await supabase.from("tasks").delete().eq("id", validatedId).throwOnError();

    revalidatePath("/", "layout");

    return { message: "Task deleted succesfully" };
  } catch (error) {
    if (error instanceof Error) {
      error.cause = { nextNoDigest: true, originalCause: error.cause };
      throw error;
    }
  }
};
