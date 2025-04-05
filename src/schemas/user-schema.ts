import { z } from "zod";

export const userSchema = z.object({
  createdAt: z.string(),
  email: z.string().email("Wrong email format"),
  id: z.string().uuid(),
  name: z.string().min(1, "Name is required"),
  provider: z.string(),
});
export const updateUsernameRequestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  id: z.string().uuid(),
});
export const usersSchema = z.array(userSchema);

export type UpdateUsernameRequestSchema = z.infer<
  typeof updateUsernameRequestSchema
>;
export type User = z.infer<typeof userSchema>;
