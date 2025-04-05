"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
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

export function SettingsPageDialog() {
  const queryClient = useQueryClient();
  const router = useRouter();
  useEffect(() => {
    router.prefetch("/app/today");
    queryClient.prefetchQuery({
      ...taskApi.getTodayTasksQueryOptions(),
      staleTime: 5 * 1000,
    });
  }, [router, queryClient]);

  const handleOpenChange = (open: boolean) => {
    if (open) return;
    router.push("/app/today");
  };
  return (
    <Dialog open onOpenChange={handleOpenChange}>
      <DialogContent
        className="gap-0 items-center p-0 md:max-w-3xl w-full"
        customClose
        animated={false}
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
