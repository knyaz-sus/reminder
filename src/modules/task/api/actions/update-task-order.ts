"use server";

import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import { Tasks, tasksSchema } from "@/types/schemas";
import { revalidatePath } from "next/cache";

export const updateTaskOrder = async (updatedTasks: Tasks) => {
  try {
    const validatedData = tasksSchema.parse(updatedTasks);

    const supabase = await createServerSupabase();
    const { data } = await supabase
      .from("tasks")
      .upsert(validatedData, { onConflict: "id" })
      .select()
      .throwOnError();

    return tasksSchema.parse(data);
  } catch (error) {
    if (error instanceof Error) return error;
  } finally {
    revalidatePath("/", "layout");
  }
};
