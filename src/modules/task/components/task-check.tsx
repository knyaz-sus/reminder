import { priorities } from "@/constants/ui";
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
        return "#ffff";
    }
  };
  return (
    <button className={className} onClick={onClick}>
      {isDone ? (
        <CircleCheck size={18} color="gray" />
      ) : (
        <Circle size={18} color={getCheckColor()} />
      )}
    </button>
  );
}
