import { Skeleton } from "@/components/skeleton";

export function SidebarUserMenuSkeleton() {
  return (
    <div className="flex gap-2 items-center pt-3 pb-2 pr-2 pl-2">
      <Skeleton className="rounded-full h-7 w-7" />
      <Skeleton className="h-5 w-28" />
    </div>
  );
}
