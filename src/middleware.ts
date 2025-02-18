import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/update-session";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    // Исключаем корневой путь "/"
    "/((?!_next/static|_next/image|favicon.ico|/?$|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
