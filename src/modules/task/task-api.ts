import { supabase } from "@/lib/supabase/create-browser-supabase";
import {
  CreateTaskRequest,
  createTaskRequestSchema,
  Tasks,
  tasksSchema,
  UpdateTaskRequest,
  updateTaskRequestSchema,
} from "@/schemas/task-schema";
import { SupabaseClient } from "@supabase/supabase-js";
import { queryOptions } from "@tanstack/react-query";
import { validateUUID } from "@/schemas/utils/validate-uuid";
import { Database } from "@/types/database";

export const taskApi = {
  baseKey: ["tasks"],

  getProjectTasksQueryOptions(
    projectId: string,
    supabaseClient: SupabaseClient<Database> = supabase
  ) {
    return queryOptions({
      queryKey: ["tasks", projectId],
      queryFn: async () => {
        try {
          const { data } = await supabaseClient
            .from("tasks")
            .select("*")
            .eq("projectId", projectId)
            .eq("isDone", false)
            .throwOnError();

          return tasksSchema.parse(data);
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    });
  },

  getTodayTasksQueryOptions(
    supabaseClient: SupabaseClient<Database> = supabase
  ) {
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

          if (!session) {
            throw Error("Unauthorized error");
          }

          const { data } = await supabaseClient
            .from("tasks")
            .select("*")
            .gte("date", startOfDay)
            .lte("date", endOfDay)
            .eq("adminId", session?.user.id)
            .eq("isDone", false);

          return tasksSchema.parse(data);
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    });
  },

  getInboxTasksQueryOptions(
    supabaseClient: SupabaseClient<Database> = supabase
  ) {
    return queryOptions({
      queryKey: ["tasks", "inbox"],
      queryFn: async () => {
        try {
          const { data } = await supabaseClient
            .from("tasks")
            .select("*")
            .eq("isDone", false)
            .is("projectId", null)
            .throwOnError();

          return tasksSchema.parse(data);
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    });
  },

  getDoneTasksQueryOptions(
    supabaseClient: SupabaseClient<Database> = supabase
  ) {
    return queryOptions({
      queryKey: ["tasks", "done"],
      queryFn: async () => {
        try {
          const { data } = await supabaseClient
            .from("tasks")
            .select("*")
            .eq("isDone", true)
            .throwOnError();

          return tasksSchema.parse(data);
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    });
  },

  async updateTask(updatedProperties: UpdateTaskRequest) {
    const validatedData = updateTaskRequestSchema.parse(updatedProperties);

    const { data } = await supabase
      .from("tasks")
      .update(validatedData)
      .eq("id", validatedData.id)
      .select("*")
      .throwOnError();

    return tasksSchema.parse(data);
  },

  async updateTaskOrder(updatedTasks: Tasks) {
    const validatedData = tasksSchema.parse(updatedTasks);

    const { data } = await supabase
      .from("tasks")
      .upsert(validatedData, { onConflict: "id" })
      .select()
      .throwOnError();

    return tasksSchema.parse(data);
  },

  async deleteTask(id: string) {
    const validatedId = validateUUID(id);

    await supabase.from("tasks").delete().eq("id", validatedId).throwOnError();

    return { message: "Task deleted succesfully" };
  },

  async createTask(createRequest: CreateTaskRequest) {
    const validatedRequest = createTaskRequestSchema.parse(createRequest);

    const session = await supabase.auth.getSession();
    const { data } = await supabase
      .from("tasks")
      .insert({ ...validatedRequest, adminId: session.data.session?.user.id })
      .select("*")
      .throwOnError();

    return tasksSchema.parse(data);
  },
};
