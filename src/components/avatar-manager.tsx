"use client";

import { ChangeEvent, useRef } from "react";
import { useAvatar } from "@/hooks/use-avatar";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase/create-browser-supabase";
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/button";

export function AvatarManager() {
  const avatarContext = useAvatar();
  const { toast } = useToast();
  const uploadRef = useRef<HTMLInputElement | null>(null);

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

      avatarContext.handleAvatarUrlUpdate(session.user.id);
      if (error) throw error;
    } catch {
      toast({
        title: "An error occurred while uploading image.",
        variant: "destructive",
      });
    }
  };
  const openMenu = () => uploadRef.current?.click();

  return (
    <div className="flex gap-4 items-end">
      <UserAvatar size={80} />
      <div>
        <div className="flex gap-4">
          <Button variant="secondary" onClick={openMenu}>
            <span>Upload photo</span>
            <input
              className="sr-only"
              type="file"
              accept="image/*"
              ref={uploadRef}
              onChange={handleImageUpload}
            />
          </Button>
          <Button variant="destructive">Delete Photo</Button>
        </div>
        <span className="text-xs text-muted-foreground pt-2">
          Your photo is public
        </span>
      </div>
    </div>
  );
}
