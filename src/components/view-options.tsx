import { Button } from "@/components/button";
import { PageFilter, pageFilters } from "@/constants/ui";
import {
  CalendarArrowDown,
  CalendarArrowUp,
  ClockArrowDown,
  SlidersHorizontal,
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./select";

interface ViewOptionsProps {
  filter: PageFilter;
  setFilter: (filter: PageFilter) => void;
}

export function ViewOptions({ filter, setFilter }: ViewOptionsProps) {
  const CurrentViewIcon = () => {
    switch (filter) {
      case "Date ascending":
        return <CalendarArrowDown />;
      case "Date decending":
        return <CalendarArrowUp />;
      case "Deadline":
        return <ClockArrowDown />;
      case "User preference":
        return <SlidersHorizontal />;
    }
  };
  return (
    <Select value={filter} onValueChange={setFilter}>
      <SelectTrigger
        asChild
        className="h-9 bg-inherit hover:bg-accent hover:text-accent-foreground border-none text-xs"
      >
        <Button variant="ghost" className="h-7 w-7">
          <CurrentViewIcon />
          <span className="sr-only">View options</span>
        </Button>
      </SelectTrigger>
      <SelectContent>
        {pageFilters.map((pagefilter) => (
          <SelectItem
            key={pagefilter}
            value={pagefilter}
            onClick={() => setFilter(pagefilter)}
          >
            {pagefilter}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
