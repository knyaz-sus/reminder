import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";
import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/app";

  if (token_hash && type) {
    const supabase = await createServerSupabase();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    console.log(error);
    if (!error) {
      redirect(next);
    }
  }
  redirect("/auth/signin");
}
