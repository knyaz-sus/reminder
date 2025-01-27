"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/button";
import { signInSchema, SingInSchema } from "@/modules/auth/schemas";
import { signInWithPassword } from "@/modules/auth/api/sign-in-with-password";
import { signInWithGithub } from "@/modules/auth/api/sign-in-with-github";
import { FormField } from "@/modules/auth/components/form-field";
import { FormFooter } from "@/modules/auth/components/form-footer";

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SingInSchema>({
    resolver: zodResolver(signInSchema),
  });
  const handleSignIn: SubmitHandler<SingInSchema> = (formData) => {
    signInWithPassword(formData.email, formData.password);
  };
  return (
    <div className="rounded-md border border-border w-full max-w-sm p-6">
      <form
        className="flex flex-col gap-3 mb-4"
        onSubmit={handleSubmit(handleSignIn)}
        id="signin-form"
        name="signin-form"
      >
        <h1 className="mb-2">Sign in</h1>
        <Button type="button" onClick={signInWithGithub}>
          <span>Sign in with github</span>
        </Button>
        <div className="flex flex-col gap-3 mb-2">
          <FormField
            register={register}
            error={errors.email?.message}
            name="email"
          />
          <FormField
            register={register}
            error={errors.password?.message}
            name="password"
            type="password"
          />
        </div>
        <Button type="submit">Sign in with password</Button>
      </form>
      <FormFooter
        path="/auth/signup"
        content="New to Reminder? "
        link="Sign up"
      />
    </div>
  );
}
