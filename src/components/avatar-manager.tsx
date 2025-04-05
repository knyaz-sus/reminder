"use client";

import { ChangeEvent, useRef } from "react";
import { useAvatar } from "@/hooks/use-avatar";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase/create-browser-supabase";
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/button";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { getClientSession } from "@/lib/supabase/get-session";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/alert-dialog";

export function AvatarManager() {
  const avatarContext = useAvatar();
  const { toast } = useToast();
  const uploadRef = useRef<HTMLInputElement | null>(null);
  const isMobile = useIsMobile();

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

  const handleImageDelete = async () => {
    try {
      const session = await getClientSession();

      const { error } = await supabase.storage
        .from("task-manager")
        .remove([session.user.id + "/" + "avatar"]);

      avatarContext.handleAvatarUrlUpdate(session.user.id);
      if (error) throw error;
    } catch {
      toast({
        title: "An error occurred while deleting image.",
        variant: "destructive",
      });
    }
  };
  const openMenu = () => uploadRef.current?.click();

  return (
    <div className="flex gap-4 items-end">
      <UserAvatar size={isMobile ? 60 : 80} />
      <div>
        <div className="flex gap-4">
          <Button
            size={isMobile ? "sm" : "default"}
            variant="secondary"
            onClick={openMenu}
          >
            <span>Upload photo</span>
            <input
              className="sr-only"
              type="file"
              accept="image/*"
              ref={uploadRef}
              onChange={handleImageUpload}
            />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size={isMobile ? "sm" : "default"} variant="destructive">
                Delete photo
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Remove profile photo?</AlertDialogTitle>
                <AlertDialogDescription>
                  Your photo will be permanently removed.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleImageDelete}
                  variant="destructive"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <span className="text-xs text-muted-foreground pt-2">
          Your photo is public
        </span>
      </div>
    </div>
  );
}
