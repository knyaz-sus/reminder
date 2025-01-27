"use client";

import { Button } from "@/components/button";
import { SingUpSchema, singUpSchema } from "@/modules/auth/schemas";
import { FormField } from "@/modules/auth/components/form-field";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFooter } from "@/modules/auth/components/form-footer";
import { signUpWithPassword } from "@/modules/auth/api/sign-up-with-password";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SingUpSchema>({
    resolver: zodResolver(singUpSchema),
  });
  const handleSignUp: SubmitHandler<SingUpSchema> = (formData) => {
    signUpWithPassword(formData.name, formData.email, formData.password);
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
            error={errors.name?.message}
            name="name"
          />
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
        <Button type="submit">Sign up</Button>
      </form>
      <FormFooter
        path="/auth/signin"
        content="Already have an account? "
        link="Login"
      />
    </div>
  );
}
