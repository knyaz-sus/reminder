"use server";

import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import {
  CreateTaskRequest,
  createTaskRequestSchema,
  tasksSchema,
} from "@/schemas/task-schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createTask = async (createRequest: CreateTaskRequest) => {
  try {
    const validatedRequest = createTaskRequestSchema.parse(createRequest);

    const supabase = await createServerSupabase();
    const user = await supabase.auth.getUser();
    if (!user) {
      redirect("/auth");
    }

    const { data } = await supabase
      .from("tasks")
      .insert({ ...validatedRequest, adminId: user.data.user?.id })
      .select("*")
      .throwOnError();

    return tasksSchema.parse(data);
  } catch (error) {
    if (error instanceof Error) return error;
  } finally {
    revalidatePath("/", "layout");
  }
};
