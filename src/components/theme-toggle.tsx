"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/toggle-group";
import { useTheme } from "next-themes";
import { DesktopIcon } from "@radix-ui/react-icons";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";
import { useIsServer } from "@/hooks/use-is-server";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const isServer = useIsServer();
  return (
    <ToggleGroup type="single">
      <ToggleGroupItem
        value="light"
        className={cn(
          { "bg-accent": theme === "light" && !isServer },
          "p-2 h-auto"
        )}
        onClick={() => setTheme("light")}
      >
        <Sun className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="system"
        className={cn(
          { "bg-accent": theme === "system" && !isServer },
          "p-2 h-auto"
        )}
        onClick={() => setTheme("system")}
      >
        <DesktopIcon className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="dark"
        className={cn(
          { "bg-accent": theme === "dark" && !isServer },
          "p-2 h-auto"
        )}
        onClick={() => setTheme("dark")}
      >
        <Moon className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
