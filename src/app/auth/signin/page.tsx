"use client";

import { useState } from "react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/button";
import { signInSchema, SingInSchema } from "@/modules/auth/schemas";
import { signInWithPassword } from "@/modules/auth/api/sign-in-with-password";
import { signInWithGithub } from "@/modules/auth/api/sign-in-with-github";
import { ErrorMessage } from "@/components/error-message";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Spinner } from "@/components/spinner";
import { Input } from "@/components/input";

export default function SignInForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isGitAuthLoading, setIsGitAuthLoading] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm<SingInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });
  const handleSignIn: SubmitHandler<SingInSchema> = async (formData) => {
    const error = await signInWithPassword(formData.email, formData.password);
    setSubmitError(error.message);
    reset();
  };
  const handleGithubAuth = async () => {
    try {
      setIsGitAuthLoading(true);
      await signInWithGithub();
    } finally {
      setIsGitAuthLoading(false);
    }
  };
  return (
    <div className="rounded-md border border-border w-full max-w-sm p-6">
      <form
        className="flex flex-col gap-3 mb-4"
        onSubmit={handleSubmit(handleSignIn)}
        id="signin-form"
        name="signin-form"
      >
        <div className="flex justify-between items-center mb-2">
          <h1>Sign in</h1>
          {(formState.isSubmitting || isGitAuthLoading) && <Spinner />}
        </div>
        <Button
          className="justify-start relative"
          type="button"
          onClick={handleGithubAuth}
        >
          <GitHubLogoIcon />
          <span className="absolute left-0 right-0 text-center">
            Sign in with github
          </span>
        </Button>
        <div className="flex flex-col gap-3 mb-2">
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
        <Button type="submit">Sign in with password</Button>
      </form>
      <div className="text-sm text-center">
        <span>New to Reminder? </span>
        <Link className="underline" href="/auth/signup">
          Sign up
        </Link>
      </div>
      {submitError && !formState.isDirty && (
        <ErrorMessage className="text-center block">{submitError}</ErrorMessage>
      )}
    </div>
  );
}
