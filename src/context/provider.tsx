"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { UserProvider } from "@/context/user-provider";
import { ThemeProvider } from "./theme-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
export function Provider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </UserProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
