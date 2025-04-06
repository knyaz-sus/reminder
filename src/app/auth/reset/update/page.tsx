import { redirect } from "next/navigation";
import {ResetPasswordForm} from "./client-page";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const { code } = await searchParams;
  if (!code) redirect("/auth/signin");
  return <ResetPasswordForm />;
}
