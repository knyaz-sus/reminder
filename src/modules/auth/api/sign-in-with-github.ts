"use server";

import { createServerSupabase } from "@/lib/supabase/create-server-supabase";

export const signInWithGithub = async () => {
  const supabase = await createServerSupabase();

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${process.env.BASE_URL}/app`,
    },
  });

  if (error) throw error;
};
