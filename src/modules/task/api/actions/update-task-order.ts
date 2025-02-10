import { supabase } from "@/lib/supabase/create-browser-supabase";
import { Tasks, tasksSchema } from "@/schemas/task-schema";

export const updateTaskOrder = async (updatedTasks: Tasks) => {
  try {
    const validatedData = tasksSchema.parse(updatedTasks);

    const { data } = await supabase
      .from("tasks")
      .upsert(validatedData, { onConflict: "id" })
      .select()
      .throwOnError();

    return tasksSchema.parse(data);
  } catch (error) {
    if (error instanceof Error) return error;
  }
};
