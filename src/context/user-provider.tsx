"use client";

import { createContext, ReactNode } from "react";
import { Session } from "@supabase/supabase-js";
import { useCurrentUser } from "@/modules/auth/hooks/use-current-user";

type UserContextType = {
  session: Session | null;
  isAuthLoading: boolean;
};

export const UserContext = createContext<UserContextType>({
  session: null,
  isAuthLoading: false,
});

export function UserProvider({ children }: { children: ReactNode }) {
  const { session, isAuthLoading } = useCurrentUser();

  return (
    <UserContext.Provider value={{ session, isAuthLoading }}>
      {children}
    </UserContext.Provider>
  );
}
