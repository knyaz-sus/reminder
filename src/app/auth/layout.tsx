import { ThemeToggle } from "@/components/theme-toggle";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="flex justify-end w-full fixed pl-6 pt-3 pb-3 pr-6">
        <ThemeToggle />
      </header>
      <main className="flex flex-col items-center justify-center p-4 min-h-screen">
        {children}
      </main>
    </>
  );
}
