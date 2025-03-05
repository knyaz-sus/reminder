export const priorities = ["1", "2", "3", "4"] as const;
export type Priorities = (typeof priorities)[number];

export const pageFilters = [
  "Date ascending",
  "Date decending",
  "Deadline",
  "User preference",
] as const;
export type PageFilter = (typeof pageFilters)[number];
