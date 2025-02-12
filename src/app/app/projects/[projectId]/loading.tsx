import { Skeleton } from "@/components/skeleton";
import { TasksSkeleton } from "@/components/tasks-skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col flex-auto max-w-[85vw] lg:max-w-3xl">
      <div className="flex flex-col">
        <Skeleton className="h-10 w-[30%] mb-4" />
        <TasksSkeleton />
      </div>
    </div>
  );
}
