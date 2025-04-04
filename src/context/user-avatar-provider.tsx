"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { getAvatarSrc } from "@/lib/supabase/storage";
import { supabase } from "@/lib/supabase/create-browser-supabase";

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
}: {
  children: ReactNode;
}) {
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) setAvatarUrl(undefined);
      else setAvatarUrl(getAvatarSrc(session.user.id));
    })();
  }, []);

  const handleAvatarUrlUpdate = useCallback((userId: string | undefined) => {
    setAvatarUrl(getAvatarSrc(userId));
  }, []);
  return (
    <UserAvatarContext value={{ avatarUrl, handleAvatarUrlUpdate }}>
      {children}
    </UserAvatarContext>
  );
}
