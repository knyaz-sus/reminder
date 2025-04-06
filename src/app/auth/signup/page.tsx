"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/button";
import { SingUpSchema, singUpSchema } from "@/modules/auth/schemas";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpWithPassword } from "@/modules/auth/api/sign-up-with-password";
import { ErrorMessage } from "@/components/error-message";
import { Spinner } from "@/components/spinner";
import { Input } from "@/components/input";
import { useToast } from "@/hooks/use-toast";

export default function SignUpForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { register, handleSubmit, formState, reset } = useForm<SingUpSchema>({
    resolver: zodResolver(singUpSchema),
    defaultValues: { name: "", email: "", password: "" },
  });
  const { toast } = useToast();
  const handleSignUp: SubmitHandler<SingUpSchema> = async (formData) => {
    const error = await signUpWithPassword(
      formData.name,
      formData.email,
      formData.password
    );
    reset();
    if (error) {
      setSubmitError(error.message);
    } else {
      toast({
        title: "Verification email successfully sent",
        variant: "default",
      });
    }
  };
  return (
    <div className="rounded-md border-border border w-full max-w-sm p-6">
      <form
        className="flex flex-col gap-3 mb-4"
        onSubmit={handleSubmit(handleSignUp)}
        id="signup-form"
        name="signup-form"
      >
        <div className="flex justify-between items-center mb-2">
          <h1>Sign up</h1>
          {formState.isSubmitting && <Spinner />}
        </div>
        <div className="flex flex-col gap-3 mb-2">
          <div>
            <label className="text-sm p-1" htmlFor="name">
              Name
            </label>
            <Input
              {...register("name")}
              type="text"
              placeholder="Enter your name"
              id="name"
              autoComplete="name"
            />
            {formState.errors.name && (
              <ErrorMessage>{formState.errors.name.message}</ErrorMessage>
            )}
          </div>
          <div>
            <label className="text-sm p-1" htmlFor="email">
              Email
            </label>
            <Input
              {...register("email")}
              type="text"
              placeholder="Enter your email"
              id="email"
              autoComplete="email"
            />
            {formState.errors.email && (
              <ErrorMessage>{formState.errors.email.message}</ErrorMessage>
            )}
          </div>
          <div>
            <label className="text-sm p-1" htmlFor="password">
              Password
            </label>
            <Input
              {...register("password")}
              type="password"
              placeholder="Enter your password"
              id="password"
              autoComplete="password"
            />
            {formState.errors.password && (
              <ErrorMessage>{formState.errors.password.message}</ErrorMessage>
            )}
          </div>
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
