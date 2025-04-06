"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/button";
import { ResetSchema, resetSchema } from "@/modules/auth/schemas";
import { ErrorMessage } from "@/components/error-message";
import { Spinner } from "@/components/spinner";
import { Input } from "@/components/input";
import { supabase } from "@/lib/supabase/create-browser-supabase";
import Link from "next/link";

export default function ResetViaEmailForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { register, handleSubmit, formState } = useForm<ResetSchema>({
    resolver: zodResolver(resetSchema),
    defaultValues: { email: "" },
  });
  const handleSendResetLink = async (data: ResetSchema) => {
    const { error } = await supabase.auth.resetPasswordForEmail(data.email);
    if (error) {
      setSubmitError(error.message);
    } else {
      setSubmitError(null);
      setIsEmailSent(true);
    }
  };
  return (
    <div className="rounded-md border border-border w-full max-w-sm p-6">
      <form
        className="flex flex-col gap-3"
        id="signin-form"
        name="signin-form"
        onSubmit={handleSubmit(handleSendResetLink)}
      >
        <div className="flex justify-between items-center mb-2">
          <h1>Forgot your password?</h1>
        </div>
        {isEmailSent ? (
          <div className="flex flex-col items-center gap-4">
            <span>You’ve been emailed a password reset link.</span>
            <Link href="/auth/signin" className="underline">
              Go to sign in
            </Link>
          </div>
        ) : (
          <>
            <span className="text-sm text-muted-foreground">
              To reset your password, please verify email address of your
              account.
            </span>
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
            <Button type="submit">
              {formState.isSubmitting ? <Spinner /> : "Reset my password"}
            </Button>
          </>
        )}
      </form>
      {submitError && !formState.isDirty && (
        <ErrorMessage className="text-center block">{submitError}</ErrorMessage>
      )}
    </div>
  );
}
