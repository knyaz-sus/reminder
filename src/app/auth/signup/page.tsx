"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { SingUpSchema, singUpSchema } from "@/modules/auth/schemas";
import { FormField } from "@/modules/auth/components/form-field";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpWithPassword } from "@/modules/auth/api/sign-up-with-password";
import Link from "next/link";
import { ErrorMessage } from "@/components/error-message";

export default function SignUpForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { register, handleSubmit, formState, reset } = useForm<SingUpSchema>({
    resolver: zodResolver(singUpSchema),
  });
  const handleSignUp: SubmitHandler<SingUpSchema> = async (formData) => {
    await signUpWithPassword(formData.name, formData.email, formData.password);
    setSubmitError("Error creating account");
    reset();
  };
  return (
    <div className="rounded-md border-border border w-full max-w-sm p-6">
      <form
        className="flex flex-col gap-3 mb-4"
        onSubmit={handleSubmit(handleSignUp)}
        id="signup-form"
        name="signup-form"
      >
        <h1 className="mb-2">Sign up</h1>
        <div className="flex flex-col gap-3 mb-2">
          <FormField
            register={register}
            error={formState.errors.name?.message}
            name="name"
          />
          <FormField
            register={register}
            error={formState.errors.email?.message}
            name="email"
          />
          <FormField
            register={register}
            error={formState.errors.password?.message}
            name="password"
            type="password"
          />
        </div>
        <Button type="submit">Sign up</Button>
      </form>
      <div className="text-sm text-center">
        <span>Already have the account? </span>
        <Link className="underline" href="/auth/signin">
          Sign in
        </Link>
      </div>
      {submitError && !formState.isDirty && (
        <ErrorMessage className="text-center block">{submitError}</ErrorMessage>
      )}
    </div>
  );
}
