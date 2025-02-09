import { supabase } from "@/lib/supabase/create-browser-supabase";
import {
  CreateTaskRequest,
  Tasks,
  tasksSchema,
  UpdateTaskRequest,
} from "@/schemas/task-schema";
import { SupabaseClient } from "@supabase/supabase-js";
import { queryOptions } from "@tanstack/react-query";
import { updateTaskOrder } from "./actions/update-task-order";
import { updateTask } from "./actions/update-task";
import { deleteTask } from "./actions/delete-task";
import { createTask } from "./actions/create-task";

export const taskApi = {
  baseKey: ["tasks"],

  getProjectTasksQueryOptions(
    projectId: string,
    supabaseClient: SupabaseClient = supabase
  ) {
    return queryOptions({
      queryKey: ["tasks", projectId],
      queryFn: async () => {
        try {
          const { data } = await supabaseClient
            .from("tasks")
            .select("*")
            .eq("projectId", projectId)
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
      },
    });
  },
  getTodayTasksQueryOptions(supabaseClient: SupabaseClient = supabase) {
    return queryOptions({
      queryKey: ["tasks", "today"],
      queryFn: async () => {
        try {
          const now = new Date();
          const startOfDay = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            0,
            0,
            0,
            0
          ).toISOString();
          const endOfDay = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            23,
            59,
            59,
            999
          ).toISOString();
          const {
            data: { session },
          } = await supabaseClient.auth.getSession();

          const { data } = await supabaseClient
            .from("tasks")
            .select("*")
            .gte("date", startOfDay)
            .lte("date", endOfDay)
            .eq("adminId", session?.user.id);

          const validatedData = tasksSchema.parse(data);
          return validatedData?.sort(
            (a, b) =>
              Number(new Date(a.createdAt)) - Number(new Date(b.createdAt))
          );
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    });
  },
  async updateTaskOrder(updatedTasks: Tasks) {
    const res = await updateTaskOrder(updatedTasks);
    if (res instanceof Error) throw res;
    else return res;
  },
  async updateTask(updatedProperties: UpdateTaskRequest) {
    const res = await updateTask(updatedProperties);
    if (res instanceof Error) throw res;
    else return res;
  },
  async deleteTask(id: string) {
    const res = await deleteTask(id);
    if (res instanceof Error) throw res;
    else return res;
  },
  async createTask(newTask: CreateTaskRequest) {
    const res = await createTask(newTask);
    if (res instanceof Error) throw res;
    else return res;
  },
};
