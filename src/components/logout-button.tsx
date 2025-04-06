"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { signOut } from "@/modules/auth/api/sign-out";
import { LogOut } from "lucide-react";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/button";

export function LogOutButton() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const queryClient = useQueryClient();
  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true);
      await signOut();
    } catch {
      setIsLoggingOut(false);
    } finally {
      queryClient.clear();
    }
  };
  return (
    <Button onClick={handleSignOut} size="xs" variant="ghost">
      {isLoggingOut ? <Spinner /> : <LogOut />}
    </Button>
  );
}
