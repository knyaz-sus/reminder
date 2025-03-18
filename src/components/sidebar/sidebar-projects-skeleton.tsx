import { Skeleton } from "@/components/skeleton";
import { ChevronDown } from "lucide-react";

export function SidebarProjectsSkeleton() {
  return (
    <div className="text-sm pt-1 pb-1 pl-2 pr-2">
      <div
        className="flex justify-between items-center gap-2 w-full rounded-[0.375rem]
                   pl-2 pt-1 pb-1 text-left font-semibold"
      >
        <div className="flex-auto">My projects</div>
        <button className="[&>svg]:size-4 [&>svg]:shrink-0 p-1 ml-auto">
          <ChevronDown
            className="w-4 h-4 shrink-0 transition-transform"
            strokeWidth={3}
          />
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="ml-1 h-7" />
          ))}
      </div>
    </div>
  );
}
