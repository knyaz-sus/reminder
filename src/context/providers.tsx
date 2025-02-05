"use client";

import {
  QueryClient,
  QueryClientProvider,
  isServer,
} from "@tanstack/react-query";
import { ReactNode } from "react";
import { UserProvider } from "@/context/user-provider";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@/components/toaster";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export function Providers({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();
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
          <Toaster />
        </ThemeProvider>
      </UserProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
