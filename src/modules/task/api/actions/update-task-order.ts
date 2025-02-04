"use server";

import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import { Tasks, tasksSchema } from "@/schemas/task-schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const updateTaskOrder = async (updatedTasks: Tasks) => {
  try {
    const validatedData = tasksSchema.parse(updatedTasks);

    const supabase = await createServerSupabase();

    const user = await supabase.auth.getUser();
    if (!user) {
      redirect("/auth/login");
    }

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
