import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { ErrorSpan } from "@/components/error-message";
import { Input } from "@/components/input";

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: string;
  type?: "text" | "password";
}

export function FormField<T extends FieldValues>({
  name,
  error,
  register,
  type = "text",
}: FormFieldProps<T>) {
  return (
    <div>
      <label className="text-sm p-1" htmlFor={name}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      <Input
        {...register(name)}
        type={type}
        placeholder={`Enter your ${name}`}
        id={name}
        autoComplete={name}
      />
      {error && <ErrorSpan>{error}</ErrorSpan>}
    </div>
  );
}
