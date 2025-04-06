"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/button";
import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from "@/modules/auth/schemas";
import { ErrorMessage } from "@/components/error-message";
import { Spinner } from "@/components/spinner";
import { Input } from "@/components/input";
import { resetPassword } from "@/modules/auth/api/reset-password";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export function ResetPasswordForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { register, handleSubmit, formState } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const handlePasswordUpdate = async (data: ResetPasswordSchema) => {
    const code = searchParams.get("code") as string;

    const { error } = await resetPassword(data.confirmPassword, code);
    if (error) {
      setSubmitError(error);
      return;
    }
    setSubmitError(null);
    toast({
      title: "Password updated successfully",
      variant: "default",
    });
  };
  return (
    <div className="rounded-md border border-border w-full max-w-sm p-6">
      <form
        className="flex flex-col gap-3"
        id="signin-form"
        name="signin-form"
        onSubmit={handleSubmit(handlePasswordUpdate)}
      >
        <div className="flex justify-between items-center mb-2">
          <h1>Confirm your new password</h1>
        </div>
        <div>
          <label className="text-sm p-1" htmlFor="password">
            Password
          </label>
          <Input
            {...register("password")}
            type="password"
            placeholder="Enter new password"
            id="password"
            autoComplete="password"
          />
          {formState.errors.password && (
            <ErrorMessage>{formState.errors.password.message}</ErrorMessage>
          )}
        </div>
        <div>
          <label className="text-sm p-1" htmlFor="confirmPassword">
            Confirm password
          </label>
          <Input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm new password"
            id="confirmPassword"
            autoComplete="password"
          />
          {formState.errors.confirmPassword && (
            <ErrorMessage>
              {formState.errors.confirmPassword.message}
            </ErrorMessage>
          )}
        </div>
        <Button type="submit">
          {formState.isSubmitting ? <Spinner /> : "Reset my password"}
        </Button>
      </form>
      {submitError && !formState.isDirty && (
        <ErrorMessage className="text-center block">{submitError}</ErrorMessage>
      )}
    </div>
  );
}
