import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { userApi } from "@/api/user-api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/alert-dialog";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { deleteUser } from "@/modules/auth/api/delete-user";
import { useToast } from "@/hooks/use-toast";
import { Spinner } from "@/components/spinner";

export function SettingsDeleteAccount() {
  const { data: user } = useSuspenseQuery(userApi.getUserQueryOptions());
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    if (deleteConfirmation != user.email) {
      return;
    }
    setIsDeleting(true);
    const { error } = await deleteUser();
    if (error) {
      toast({
        title: "An error occurred while deleting account.",
        variant: "destructive",
      });
    }
    setIsDeleting(false);
  };
  return (
    <div className="flex flex-col gap-2 items-start">
      <span className="text-xs">
        All your data, including tasks, projects, and more, will be permanently
        deleted without the possibility of recovery.
      </span>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm" variant="destructive">
            {isDeleting ? <Spinner /> : "Delete account"}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm account delete</AlertDialogTitle>
            <AlertDialogDescription>
              To confirm, type{" "}
              <span className="font-semibold">&quot;{user.email}&quot;</span> in
              the box below
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex items-center">
            <label htmlFor="delete-confirmation" className="sr-only">
              Delete confirmation
            </label>
            <Input
              id="delete-confirmation"
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={handleDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
