"use server";

import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signInWithGithub = async () => {
  const origin = (await headers()).get("origin");
  console.log("origin", origin);
  const supabase = await createServerSupabase();

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  console.log("data.url", data.url);

  if (error) {
    console.log(error);
    throw error;
  } else {
    redirect(data.url);
  }
};
