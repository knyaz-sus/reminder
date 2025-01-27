import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/create-browser-supabase";
import { Session } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";

export const useCurrentUser = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setIsAuthLoading(false);
      if (event === "USER_UPDATED" || event === "SIGNED_OUT") {
        queryClient.resetQueries();
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, [queryClient]);

  return { session, isAuthLoading };
};
