"use server";

import { createServerSupabase } from "@/lib/supabase/create-server-supabase";
import {
  updateUsernameRequestSchema,
  UpdateUsernameRequestSchema,
  userSchema,
} from "@/schemas/user-schema";
import { revalidatePath } from "next/cache";

export async function updateUser(updateRequest: UpdateUsernameRequestSchema) {
  const validatedRequest = updateUsernameRequestSchema.parse(updateRequest);

  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("users")
    .update(validatedRequest)
    .eq("id", validatedRequest.id)
    .select("*")
    .single()
    .throwOnError();

  revalidatePath("/", "layout");

  return userSchema.parse(data);
}
