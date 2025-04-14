import { isToday, isYesterday, isTomorrow, format } from "date-fns";

export const formatTaskDate = (date: Date | string | number) => {
  const parsedDate = new Date(date);

  if (isToday(parsedDate)) return `Today, ${format(parsedDate, "HH:mm")}`;
  if (isYesterday(parsedDate))
    return `Yesterday, ${format(parsedDate, "HH:mm")}`;
  if (isTomorrow(parsedDate)) return `Tomorrow, ${format(parsedDate, "HH:mm")}`;

  return `${format(parsedDate, "MMM d, yyyy")}, ${format(parsedDate, "HH:mm")}`;
};
