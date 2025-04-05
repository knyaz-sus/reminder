"use client";

import { AvatarManager } from "@/components/avatar-manager";
import { userApi } from "@/api/user-api";
import { Button } from "@/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import { Input } from "@/components/input";
import { Separator } from "@/components/separator";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUpdateUser } from "@/api/hooks/use-update-username";
import { getClientSession } from "@/lib/supabase/get-session";

export default function SettingsModal() {
  const { data: user } = useQuery(userApi.getUserQueryOptions());
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const { mutate } = useUpdateUser();
  const [name, setName] = useState(user?.name);

  const handleNavigation = () => {
    if (!open) router.back();
  };
  const handleNameUpdate = async (open: boolean) => {
    setOpen(open);
    if (!name) return;
    const session = await getClientSession();
    mutate({ id: session.user.id, name });
  };
  return (
    <Dialog open={open} onOpenChange={handleNameUpdate}>
      <DialogContent
        className="gap-0 items-center p-0 md:max-w-3xl w-full"
        customClose
        onAnimationEnd={handleNavigation}
      >
        <DialogHeader className="flex items-center justify-between flex-row p-4">
          <DialogTitle>Account settings</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="xs">
              <X />
            </Button>
          </DialogClose>
        </DialogHeader>
        <Separator />
        <ul className="flex flex-col gap-4 p-4">
          <li>
            <h3 className="font-semibold mb-2">Photo</h3>
            <AvatarManager />
          </li>
          <li>
            <h3 className="font-semibold mb-2">Name</h3>
            <div className="flex flex-col w-80 items-start gap-[0.25rem]">
              <Input
                className="shadow-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <span className="text-xs self-end text-muted-foreground">
                {name?.length}/255
              </span>
            </div>
          </li>
          <li>
            <h3 className="font-semibold mb-2">Email</h3>
            <div className="flex flex-col gap-2 items-start">
              <span className="text-sm">{user?.email}</span>
              <Button size="sm" variant="secondary">
                Change email
              </Button>
            </div>
          </li>
          <li>
            <h3 className="font-semibold mb-2">Password</h3>
            <div className="flex flex-col gap-2 items-start">
              <Button size="sm" variant="secondary">
                Change password
              </Button>
            </div>
          </li>
          <li>
            <h3 className="font-semibold mb-2">Delete account</h3>
            <div className="flex flex-col gap-2 items-start">
              <span className="text-xs">
                All your data, including tasks, projects, and more, will be
                permanently deleted without the possibility of recovery.
              </span>
              <Button size="sm" variant="destructive">
                Delete account
              </Button>
            </div>
          </li>
        </ul>
      </DialogContent>
    </Dialog>
  );
}
