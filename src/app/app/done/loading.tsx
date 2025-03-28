import { DoneTasksSkeleton } from "@/components/done-tasks-skeleton";

export default function Loading() {
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col pt-16 px-4 pb-6 flex-auto max-w-[85vw] lg:max-w-3xl">
        <div className="flex flex-col">
          <h1 className="mb-5">Done</h1>
          <DoneTasksSkeleton />
        </div>
      </div>
    </div>
  );
}
