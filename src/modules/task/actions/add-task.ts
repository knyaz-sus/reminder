"use server";

import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import { CreateTaskRequestSchema, tasksSchema } from "@/types/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addTask = async (newTask: CreateTaskRequestSchema) => {
  try {
    const supabase = await createServerSupabase();
    const user = await supabase.auth.getUser();
    if (!user) {
      redirect("/auth");
    }
    const { data } = await supabase
      .from("tasks")
      .insert({ ...newTask, adminId: user.data.user?.id })
      .select("*")
      .throwOnError();

    const validatedData = tasksSchema.parse(data);

    revalidatePath("/", "layout");

    return validatedData;
  } catch (error) {
    if (error instanceof Error) return { error, message: error.message };
  }
};
