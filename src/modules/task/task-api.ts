import { supabase } from "@/lib/supabase/create-browser-supabase";
import {
  Tasks,
  tasksSchema,
  updateTaskRequestSchema,
  UpdateTaskRequestSchema,
} from "@/types/schemas";
import { validateUUID } from "@/utils/validateUUID";
import { queryOptions } from "@tanstack/react-query";
import { unstable_cache } from "next/cache";

export const taskApi = {
  baseKey: ["tasks"],
  getProjectTasksQueryOptions(param: string) {
    return queryOptions({
      queryKey: ["tasks", param],
      queryFn: unstable_cache(async () => {
        try {
          const { data } = await supabase
            .from("tasks")
            .select("*")
            .eq("projectId", param)
            .throwOnError();
          const validatedData = tasksSchema.parse(data);
          return validatedData;
        } catch (error) {
          console.log(error);
        }
      }),
    });
  },

  async deleteTask(id: string) {
    const validatedId = validateUUID(id);
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", validatedId);

    if (error) return { message: error.message };
    return { message: "Task deleted succesfully" };
  },

  async updateTask(updatedProperties: UpdateTaskRequestSchema) {
    try {
      const validatedData = updateTaskRequestSchema.parse(updatedProperties);

      const { data } = await supabase
        .from("tasks")
        .update(validatedData)
        .eq("id", validatedData.id)
        .select("*")
        .throwOnError();

      return data;
    } catch (error) {
      if (error instanceof Error) return { error, message: error.message };
    }
  },

  async updateOrder(updatedTasks: Tasks) {
    try {
      const validatedData = tasksSchema.parse(updatedTasks);

      const { data } = await supabase
        .from("tasks")
        .upsert(validatedData, { onConflict: "id" })
        .select()
        .throwOnError();

      return tasksSchema.parse(data);
    } catch (error) {
      if (error instanceof Error) return { error, message: error.message };
    }
  },
};
