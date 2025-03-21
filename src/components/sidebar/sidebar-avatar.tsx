"use client";

import { ChangeEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { userApi } from "@/api/user-api";
import { SidebarMenuItem } from "./sidebar";
import { supabase } from "@/lib/supabase/create-browser-supabase";
import { useToast } from "@/hooks/use-toast";
import { useAvatar } from "@/hooks/use-avatar";

export function SidebarAvatar() {
  const { data: user } = useQuery(userApi.getUserQueryOptions());
  const { avatarUrl, handleAvatarUrlUpdate } = useAvatar();
  const { toast } = useToast();

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const fileList = e.target.files;
      if (!fileList) return;

      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("Auth error");
      }

      const { error } = await supabase.storage
        .from("task-manager")
        .upload(session.user.id + "/" + "avatar", fileList[0], {
          upsert: true,
        });

      handleAvatarUrlUpdate(session.user.id);
      if (error) throw error;
    } catch {
      toast({
        title: "An error occurred while uploading image.",
        variant: "destructive",
      });
    }
  };

  return (
    <SidebarMenuItem className="flex gap-3 items-center text-sm">
      <Avatar className="h-7 w-7">
        <label className="flex items-center justify-center w-full h-full">
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {avatarUrl && (
            <AvatarImage
              width={28}
              height={28}
              src={avatarUrl}
              alt="image"
              className="w-7 h-7 aspect-square object-cover"
              asChild
            />
          )}
          <AvatarFallback className="bg-secondary w-7 h-7 text-secondary-foreground rounded-full">
            {user?.name?.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </label>
      </Avatar>
      <span className="max-w-32 font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
        {user?.name}
      </span>
    </SidebarMenuItem>
  );
}
