import { z } from "zod";

export const projectSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  updatedAt: z.string(),
  createdAt: z.string(),
});

export const projectsSchema = z.array(projectSchema);

export const createProjectRequestSchema = z.object({
  id: z.string().uuid(),
  name: z.string().nonempty(),
});

export const deleteProjectRequestSchema = z.object({
  id: z.string().uuid(),
});

export const updateProjectRequestSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).optional(),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
});

export type Project = z.infer<typeof projectSchema>;

export type Projects = Project[];

export type UpdateProjectRequest = z.infer<typeof updateProjectRequestSchema>;

export type CreateProjectRequest = z.infer<typeof createProjectRequestSchema>;

export type DeleteProjectRequest = z.infer<typeof deleteProjectRequestSchema>;
