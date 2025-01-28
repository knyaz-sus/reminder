"use server";

import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import {
  tasksSchema,
  updateTaskRequestSchema,
  UpdateTaskRequestSchema,
} from "@/types/schemas";
import { revalidatePath } from "next/cache";

export const updateTask = async (
  updatedProperties: UpdateTaskRequestSchema
) => {
  try {
    const validatedData = updateTaskRequestSchema.parse(updatedProperties);

    const supabase = await createServerSupabase();
    const { data } = await supabase
      .from("tasks")
      .update(validatedData)
      .eq("id", validatedData.id)
      .select("*")
      .throwOnError();

    revalidatePath("/", "layout");

    return tasksSchema.parse(data);
  } catch (error) {
    if (error instanceof Error) {
      error.cause = { nextNoDigest: true, originalCause: error.cause };
      throw error;
    }
  }
};
