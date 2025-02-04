"use server";

import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import {
  tasksSchema,
  updateTaskRequestSchema,
  UpdateTaskRequest,
} from "@/schemas/task-schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const updateTask = async (updatedProperties: UpdateTaskRequest) => {
  try {
    const validatedData = updateTaskRequestSchema.parse(updatedProperties);

    const supabase = await createServerSupabase();

    const user = await supabase.auth.getUser();
    if (!user) {
      redirect("/auth/login");
    }

    const { data } = await supabase
      .from("tasks")
      .update(validatedData)
      .eq("id", validatedData.id)
      .select("*")
      .throwOnError();

    return tasksSchema.parse(data);
  } catch (error) {
    if (error instanceof Error) return error;
  } finally {
    revalidatePath("/", "layout");
  }
};
