import { z } from "zod";

export const userSchema = z.object({
  createdAt: z.string(),
  email: z.string().email("Wrong email format"),
  id: z.string().uuid(),
  name: z.string().min(1),
  provider: z.string(),
});

export const usersSchema = z.array(userSchema);

export type User = z.infer<typeof userSchema>;
