import { Database } from "@/types/database";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { createFetch } from "@/lib/create-fetch";

export async function createServerSupabase(
  fetchOptions?: Pick<RequestInit, "next" | "cache">
) {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      global: {
        fetch: fetchOptions && createFetch(fetchOptions),
      },
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );
}
