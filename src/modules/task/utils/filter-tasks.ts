import { PageFilter } from "@/constants/ui";
import { Tasks } from "@/schemas/task-schema";

export const filterTasks = (tasks: Tasks, filter: PageFilter) => {
  switch (filter) {
    case "Date ascending":
      return tasks.sort((a, b) => {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      });
    case "Date decending":
      return tasks.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
    case "Deadline":
      return tasks.sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    case "User preference":
      return tasks?.sort((a, b) => {
        const aOrder = a.order as number;
        const bOrder = b.order as number;
        return aOrder - bOrder;
      });
  }
};
