import { cn } from "@/lib/cn";

export function ErrorMessage({
  children,
  className,
}: React.HTMLAttributes<"span">) {
  return (
    <span className={cn("text-sm text-red-400 p-1", className)}>
      {children}
    </span>
  );
}
