export const priorities = ["1", "2", "3", "4"] as const;
export type Priorities = (typeof priorities)[number];

export const defaultPages = ["Today", "For me", "Done"] as const;
export type DefaultPages = (typeof defaultPages)[number];
