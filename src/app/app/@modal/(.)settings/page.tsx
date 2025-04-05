"use client";

import { AvatarManager } from "@/components/avatar-manager";
// import { userApi } from "@/api/user-api";
import { Button } from "@/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import { Separator } from "@/components/separator";
// import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SettingsModal() {
  // const { data: user } = useQuery(userApi.getUserQueryOptions());
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const handleNavigation = () => {
    if (!open) router.back();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="gap-0 items-center p-0 md:max-w-3xl w-full"
        customClose
        onAnimationEnd={handleNavigation}
      >
        <DialogHeader className="flex items-center justify-between flex-row p-3">
          <DialogTitle>Account settings</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="xs">
              <X />
            </Button>
          </DialogClose>
        </DialogHeader>
        <Separator />
        <ul className="flex flex-col gap-4 p-3">
          <li>
            <h3 className="font-semibold mb-2">Photo</h3>
            <AvatarManager />
          </li>
          <li>
            <h3 className="font-semibold mb-2">Name</h3>
          </li>
          <li>
            <h3 className="font-semibold mb-2">Email</h3>
          </li>
          <li>
            <h3 className="font-semibold mb-2">Password</h3>
          </li>
        </ul>
      </DialogContent>
    </Dialog>
  );
}
