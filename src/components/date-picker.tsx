"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { addDays } from "date-fns";
import { cn } from "@/lib/cn";
import { Button } from "@/components/button";
import { Calendar } from "@/components/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { formatTaskDate } from "@/modules/task/utils/format-task-date";
import { useIsServer } from "@/hooks/use-is-server";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";

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
            <span className="overflow-hidden text-ellipsis">
              {!date && "Pick a date"}
              {date && !isServer && formatTaskDate(date)}
            </span>
          }
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <Select
          onValueChange={(value) =>
            handleDateChange(addDays(new Date(), parseInt(value)))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Today</SelectItem>
            <SelectItem value="1">Tomorrow</SelectItem>
            <SelectItem value="3">In 3 days</SelectItem>
            <SelectItem value="7">In a week</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar mode="single" selected={date} onSelect={handleDateChange} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
