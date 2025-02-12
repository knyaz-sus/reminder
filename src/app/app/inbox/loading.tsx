import { TasksSkeleton } from "@/components/tasks-skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col flex-auto max-w-[85vw] lg:max-w-3xl">
      <div className="flex flex-col">
        <h1 className="mb-5">Inbox</h1>
        <TasksSkeleton />
      </div>
    </div>
  );
}
