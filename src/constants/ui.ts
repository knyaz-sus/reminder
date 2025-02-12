export const priorities = ["1", "2", "3", "4"] as const;
export type Priorities = (typeof priorities)[number];