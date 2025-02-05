"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/button";
import { Calendar } from "@/components/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { formatTaskDate } from "@/modules/task/utils/format-task-date";
import { useIsServer } from "@/hooks/use-is-server";

export function DatePicker({
  controlledDate,
  setControlledDate,
}: {
  controlledDate?: Date;
  setControlledDate?: (date: Date | undefined) => void;
}) {
  const [localDate, setLocalDate] = useState<Date | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const isServer = useIsServer();
  const date = controlledDate ?? localDate;

  const handleDateChange = (day: Date | undefined) => {
    if (setControlledDate) {
      setControlledDate(day);
    } else {
      setLocalDate(day);
    }
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "text-xs justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {
            <span>
              {!date && "Pick a date"}
              {date && !isServer && formatTaskDate(date)}
            </span>
          }
        </Button>
      </PopoverTrigger>
      <PopoverContent side="right" alignOffset={5} className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={handleDateChange} />
      </PopoverContent>
    </Popover>
  );
}
