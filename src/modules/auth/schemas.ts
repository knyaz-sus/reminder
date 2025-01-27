import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Wrong email format"),
  password: z.string().min(6, "Password should have at least 6 characters"),
});

export const singUpSchema = z.object({
  name: z.string().min(1, "Username is required"),
  email: z.string().email("Wrong email format"),
  password: z.string().min(6, "Password should have at least 6 characters"),
});

export type SingUpSchema = z.infer<typeof singUpSchema>;
export type SingInSchema = z.infer<typeof signInSchema>;
