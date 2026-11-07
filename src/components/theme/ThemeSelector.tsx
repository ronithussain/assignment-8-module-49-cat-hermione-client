"use client";

import { useSyncExternalStore } from "react";
import { Monitor, Moon, Sun, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";

const subscribe = () => () => {};

function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <div className="h-10 w-[150px] rounded-xl border border-border bg-background/80 shadow-sm" />
    );
  }

  return (
    <div className="relative inline-flex items-center">
      <div
        className="
          group flex items-center gap-2
           pr-3 py-2
       
          transition-all duration-300
          
        "
      >
        {theme === "light" && (
          <Sun className="h-4 w-4 text-amber-500 transition-transform duration-300 group-hover:rotate-45" />
        )}

        {theme === "dark" && (
          <Moon className="h-4 w-4 text-indigo-500 transition-transform duration-300 group-hover:-rotate-12" />
        )}

        {theme === "system" && (
          <Monitor className="h-4 w-4 text-primary transition-transform duration-300 group-hover:scale-110" />
        )}

        <select
          value={theme ?? "system"}
          onChange={(e) => setTheme(e.target.value)}
          aria-label="Select theme"
          className="
            cursor-pointer appearance-none
            bg-transparent pr-5
            text-sm font-medium
            text-foreground
            outline-none
          "
        >
          <option value="light">Light Mode</option>
          <option value="dark">Dark Mode</option>
          <option value="system">System</option>
        </select>

        <ChevronDown
          className="
            pointer-events-none absolute right-3
            h-4 w-4 text-muted-foreground
            transition-transform duration-300
            group-hover:translate-y-0.5
          "
        />
      </div>
    </div>
  );
}