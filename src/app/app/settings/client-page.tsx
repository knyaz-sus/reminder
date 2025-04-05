"use client";

import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { userApi } from "@/api/user-api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/dialog";
import { taskApi } from "@/modules/task/task-api";

export function SettingsPageDialog() {
  const { data: user } = useQuery(userApi.getUserQueryOptions());
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
    <Dialog defaultOpen onOpenChange={handleOpenChange}>
      <DialogTitle className="sr-only">this is settings modal</DialogTitle>
      <DialogDescription className="sr-only">
        this is settings modal
      </DialogDescription>
      <DialogContent animated={false}>{user?.name}</DialogContent>
    </Dialog>
  );
}
