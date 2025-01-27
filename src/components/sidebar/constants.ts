import { Inbox, SquareChartGantt } from "lucide-react";

export const sidebarMenuRoutes = [
  { name: "Inbox", Icon: Inbox, path: "/app/inbox" },
  { name: "Today", Icon: SquareChartGantt, path: "/app/today" },
] as const;

export const SIDEBAR_WIDTH = "16rem";
export const SIDEBAR_WIDTH_MOBILE = "18rem";
export const SIDEBAR_WIDTH_ICON = "3rem";
export const SIDEBAR_KEYBOARD_SHORTCUT = "m";
export const SIDEBAR_COOKIE_NAME = "sidebar:state";
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
