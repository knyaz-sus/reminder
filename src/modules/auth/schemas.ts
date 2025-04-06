import { z } from "zod";

export const resetSchema = z.object({
  email: z.string().email("Wrong email format"),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password should have at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password should have at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: z.string().email("Wrong email format"),
  password: z.string().min(6, "Password should have at least 6 characters"),
});

export const singUpSchema = z.object({
  name: z.string().min(1, "Username is required"),
  email: z.string().email("Wrong email format"),
  password: z.string().min(6, "Password should have at least 6 characters"),
});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export type ResetSchema = z.infer<typeof resetSchema>;
export type SingUpSchema = z.infer<typeof singUpSchema>;
export type SingInSchema = z.infer<typeof signInSchema>;
