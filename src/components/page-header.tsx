import { PageFilter } from "@/constants/ui";
import { SidebarTrigger } from "./sidebar/sidebar";
import { ViewOptions } from "./view-options";

interface PageHeaderProps {
  filter: PageFilter;
  setFilter: (filter: PageFilter) => void;
}

export function PageHeader({ filter, setFilter }: PageHeaderProps) {
  return (
    <header className="flex items-center fixed justify-between h-[52px] z-[2] bg-background px-4 w-full">
      <SidebarTrigger />
      <ViewOptions filter={filter} setFilter={setFilter} />
    </header>
  );
}
