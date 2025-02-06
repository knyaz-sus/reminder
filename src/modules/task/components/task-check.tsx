import { priorities } from "@/constants/ui";
import { cn } from "@/lib/cn";
import { CircleCheck, Circle } from "lucide-react";

interface TaskCheckProps {
  className?: string;
  onClick?: () => void;
  priority: (typeof priorities)[number];
  isDone: boolean;
}

export function TaskCheck({
  priority,
  className,
  onClick,
  isDone,
}: TaskCheckProps) {
  const getCheckColor = () => {
    switch (priority) {
      case "1":
        return "#dc2828";
      case "2":
        return "#facc14";
      case "3":
        return "#2463eb";
      case "4":
        return undefined;
    }
  };
  return (
    <button className={className} onClick={onClick}>
      {isDone ? (
        <CircleCheck size={18} color="gray" />
      ) : (
        <Circle
          size={18}
          color={getCheckColor()}
          className={cn({ "text-foreground/90": priority === "4" })}
        />
      )}
    </button>
  );
}
