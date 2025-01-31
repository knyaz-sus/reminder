import { supabase } from "@/lib/supabase/create-browser-supabase";
import {
  CreateTaskRequestSchema,
  Tasks,
  tasksSchema,
  UpdateTaskRequestSchema,
} from "@/types/schemas";
import { SupabaseClient } from "@supabase/supabase-js";
import { queryOptions } from "@tanstack/react-query";
import { unstable_cache } from "next/cache";
import { updateTaskOrder } from "./actions/update-task-order";
import { updateTask } from "./actions/update-task";
import { deleteTask } from "./actions/delete-task";
import { createTask } from "./actions/create-task";

export const taskApi = {
  baseKey: ["tasks"],

  getProjectTasksQueryOptions(
    param: string,
    supabaseClient: SupabaseClient = supabase
  ) {
    return queryOptions({
      queryKey: ["tasks", param],
      queryFn: unstable_cache(async () => {
        try {
          const { data } = await supabaseClient
            .from("tasks")
            .select("*")
            .eq("projectId", param)
            .throwOnError();

          const validatedData = tasksSchema.parse(data);
          return validatedData.sort((a, b) => {
            const aOrder = a.order as number;
            const bOrder = b.order as number;
            return aOrder - bOrder;
          });
        } catch (error) {
          console.log(error);
          throw error;
        }
      }),
    });
  },
  async updateTaskOrder(updatedTasks: Tasks) {
    const res = await updateTaskOrder(updatedTasks);
    if (res instanceof Error) throw res;
    else return res;
  },
  async updateTask(updatedProperties: UpdateTaskRequestSchema) {
    const res = await updateTask(updatedProperties);
    if (res instanceof Error) throw res;
    else return res;
  },
  async deleteTask(id: string) {
    const res = await deleteTask(id);
    if (res instanceof Error) throw res;
    else return res;
  },
  async createTask(newTask: CreateTaskRequestSchema) {
    const res = await createTask(newTask);
    if (res instanceof Error) throw res;
    else return res;
  },
};
