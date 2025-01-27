import { z } from "zod";

export const userRowSchema = z.object({
  createdAt: z.string(),
  email: z.string().email("Wrong email format"),
  id: z.string().uuid(),
  name: z.string().min(1),
  provider: z.string(),
});
export const usersRowSchema = z.array(userRowSchema);

export const projectSchema = z.object({
  adminId: z.string().uuid(),
  id: z.string().uuid(),
  name: z.string().min(1),
  updatedAt: z.string(),
  createdAt: z.string(),
});
export const projectsSchema = z.array(projectSchema);

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

export type Project = z.infer<typeof projectSchema>;
export type UserRow = z.infer<typeof userRowSchema>;
export type Task = z.infer<typeof taskSchema>;

export type Projects = Project[];
export type UserRows = UserRow[];
export type Tasks = Task[];

export const createProjectRequestSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().nonempty(),
  adminId: z.string().uuid(),
});

export const deleteProjectRequestSchema = z.object({
  id: z.string().uuid(),
  adminId: z.string().uuid(),
});

export const updateProjectRequestSchema = z.object({
  adminId: z.string().uuid().optional(),
  id: z.string().uuid(),
  name: z.string().min(1).optional(),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
});

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

export type CreateTaskRequestSchema = z.infer<typeof createTaskRequestSchema>;

export type UpdateTaskRequestSchema = z.infer<typeof updateTaskRequestSchema>;

export type UpdateProjectRequestSchema = z.infer<
  typeof updateProjectRequestSchema
>;

export type CreateProjectRequestSchema = z.infer<
  typeof createProjectRequestSchema
>;

export type DeleteProjectRequestSchema = z.infer<
  typeof deleteProjectRequestSchema
>;
