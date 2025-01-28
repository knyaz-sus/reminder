"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { priorities } from "@/constants/ui";
import { Flag } from "lucide-react";
import { useState } from "react";

interface PrioritySelectProps {
  priority: (typeof priorities)[number];
  onSelectChange: (arg: (typeof priorities)[number]) => void;
}

export function PrioritySelect({
  priority,
  onSelectChange,
}: PrioritySelectProps) {
  const [open, onOpenChange] = useState(false);
  return (
    <Select
      open={open}
      onOpenChange={onOpenChange}
      value={`${priority}`}
      onValueChange={onSelectChange}
    >
      <SelectTrigger
        asChild
        className="h-9 bg-inherit hover:bg-accent hover:text-accent-foreground border-none text-xs"
      >
        <button
          onClick={() => onOpenChange(true)}
          className="flex gap-2 items-center rounded-md px-3 "
        >
          <Flag size={17} />
          <SelectValue />
        </button>
      </SelectTrigger>
      <SelectContent>
        {priorities.map((el) => (
          <SelectItem key={el} value={`${el}`}>
            <span>Priority {el}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
