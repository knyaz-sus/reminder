"use client";

import { userApi } from "@/api/user-api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/dialog";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SettingsModal() {
  const { data: user } = useQuery(userApi.getUserQueryOptions());
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const handleNavigation = () => {
    if (!open) router.back();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle className="sr-only">this is settings modal</DialogTitle>
      <DialogDescription className="sr-only">
        this is settings modal
      </DialogDescription>
      <DialogContent onAnimationEnd={handleNavigation}>
        {user?.name}
      </DialogContent>
    </Dialog>
  );
}
