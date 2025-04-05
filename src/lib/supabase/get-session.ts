import { supabase } from "./create-browser-supabase";

export async function getClientSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    throw Error("Auth error while creating projects");
  }
  return session;
}
