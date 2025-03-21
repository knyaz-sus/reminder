import { Skeleton } from "./skeleton";

export function DoneTasksSkeleton() {
  return (
    <ul className="flex flex-col gap-4">
      {Array(7)
        .fill(0)
        .map((_, index) => (
          <li className="flex gap-2" key={index}>
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="h-4 py-1 w-[100%]" />
              <Skeleton className="h-4 py-1 w-[40%]" />
            </div>
          </li>
        ))}
    </ul>
  );
}
