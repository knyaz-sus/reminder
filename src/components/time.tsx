import { formatTaskDate } from "@/modules/task/utils/format-task-date";

export default function Time({ date }: { date: Date | string | number }) {
  return <span>{formatTaskDate(date)}</span>;
}
