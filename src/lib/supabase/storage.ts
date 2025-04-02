import { supabase } from "./create-browser-supabase";

export function getAvatarSrc(userId: string | undefined) {
  if (!userId) return;
  const { data } = supabase.storage
    .from("task-manager")
    .getPublicUrl(`${userId}/avatar`);
  return data.publicUrl + "?version=" + Date.now();
}
