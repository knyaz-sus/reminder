"use client";

import { useEffect, useState } from "react";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import { taskApi } from "@/modules/task/task-api";
import { Button } from "@/components/button";
import { X } from "lucide-react";
import { Separator } from "@/components/separator";
import { AvatarManager } from "@/components/avatar-manager";
import { LogOutButton } from "@/components/logout-button";
import { userApi } from "@/api/user-api";
import { Input } from "@/components/input";
import { getClientSession } from "@/lib/supabase/get-session";
import { useUpdateUser } from "@/api/hooks/use-update-username";

export function SettingsPageDialog() {
  const queryClient = useQueryClient();
  const { data: user } = useSuspenseQuery(userApi.getUserQueryOptions());
  const [name, setName] = useState(user.name);
  const router = useRouter();
  const { mutate } = useUpdateUser();
  useEffect(() => {
    router.prefetch("/app/today");
    queryClient.prefetchQuery({
      ...taskApi.getTodayTasksQueryOptions(),
      staleTime: 5 * 1000,
    });
  }, [router, queryClient]);

  const handleOpenChange = async (open: boolean) => {
    if (!name || open) return;
    const session = await getClientSession();
    mutate({ id: session.user.id, name });
    router.push("/app/today");
  };
  return (
    <Dialog open onOpenChange={handleOpenChange}>
      <DialogContent
        className="gap-0 items-center p-0 md:max-w-3xl w-full"
        customClose
        animated={false}
      >
        <DialogHeader className="flex items-center justify-between flex-row p-4">
          <DialogTitle>Account settings</DialogTitle>
          <div className="flex gap-2 justify-between items-center">
            <LogOutButton />
            <DialogClose asChild>
              <Button variant="ghost" size="xs">
                <X />
              </Button>
            </DialogClose>
          </div>
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
                {name.length}/255
              </span>
            </div>
          </li>
          <li>
            <h3 className="font-semibold mb-2">Email</h3>
            <div className="flex flex-col gap-2 items-start">
              <span className="text-sm">{user.email}</span>
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
