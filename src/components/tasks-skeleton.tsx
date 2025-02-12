import { Skeleton } from "./skeleton";

export function TasksSkeleton() {
  return (
    <ul className="flex flex-col gap-4">
      {Array(7)
        .fill(0)
        .map((_, index) => (
          <li className="flex gap-2" key={index}>
            <Skeleton className="h-5 w-5 rounded-full" />
            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="h-4 py-1 w-[100%]" />
              <Skeleton className="h-4 py-1 w-[40%]" />
              <Skeleton className="h-4 py-1 w-[20%]" />
            </div>
          </li>
        ))}
    </ul>
  );
}
