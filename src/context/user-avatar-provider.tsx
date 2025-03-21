"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { getAvatarSrc } from "@/lib/supabase/storage";
import { Session } from "@supabase/supabase-js";

interface IUserAvatarContext {
  avatarUrl: string | undefined;
  handleAvatarUrlUpdate: (userId: string | undefined) => void;
}

export const UserAvatarContext = createContext<IUserAvatarContext>({
  avatarUrl: undefined,
  handleAvatarUrlUpdate: () => {},
});

export function UserAvatarContextProvider({
  children,
  initialSession,
}: {
  children: ReactNode;
  initialSession: Session;
}) {
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    setAvatarUrl(getAvatarSrc(initialSession.user.id));
  }, [initialSession.user.id]);

  const handleAvatarUrlUpdate = useCallback((userId: string | undefined) => {
    setAvatarUrl(getAvatarSrc(userId));
  }, []);
  return (
    <UserAvatarContext value={{ avatarUrl, handleAvatarUrlUpdate }}>
      {children}
    </UserAvatarContext>
  );
}
