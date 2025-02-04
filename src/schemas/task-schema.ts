import { z } from "zod";

export const taskSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  date: z.string().nullable(),
  isDone: z.boolean(),
  projectId: z.string().uuid().nullable(),
  updatedAt: z.string(),
  priority: z.enum(["1", "2", "3", "4"]),
  createdAt: z.string(),
  adminId: z.string().uuid(),
  order: z.number().int().nullable(),
});
export const tasksSchema = z.array(taskSchema);

export const createTaskRequestSchema = z.object({
  title: z.string(),
  id: z.string().uuid(),
  projectId: z.string().uuid().nullable(),
  description: z.string().nullable(),
  date: z.string().nullable().optional(),
  updatedAt: z.string().optional(),
  priority: z.enum(["1", "2", "3", "4"]).optional(),
  order: z.number().int().nullable(),
});

export const updateTaskRequestSchema = z.object({
  id: z.string().uuid(),
  title: z.string().optional(),
  description: z.string().optional().nullable().optional(),
  date: z.string().nullable().optional(),
  isDone: z.boolean().optional(),
  projectId: z.string().uuid().optional().nullable(),
  updatedAt: z.string().optional(),
  priority: z.enum(["1", "2", "3", "4"]).optional(),
});

export type Task = z.infer<typeof taskSchema>;

export type Tasks = Task[];

export type CreateTaskRequest = z.infer<typeof createTaskRequestSchema>;

export type UpdateTaskRequest = z.infer<typeof updateTaskRequestSchema>;