"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const subscribe = () => () => {};

function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}

export default function ThemeToggle() {
  const mounted = useMounted();

  const { resolvedTheme, setTheme } = useTheme();

  if (!mounted) {
    return (
      <button
        disabled
        aria-label="Loading theme"
        className="rounded-full border border-gray-600  p-2"
      >
        <Sun size={20} />
      </button>
    );
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
  onClick={toggleTheme}
  aria-label="Toggle theme"
  className="
    group relative flex h-11 w-11 items-center justify-center
    overflow-hidden rounded-full
    border border-gray-200 dark:border-gray-700
    bg-background/80
    text-foreground
    shadow-sm backdrop-blur-md
    transition-all duration-300 ease-in-out
    hover:scale-105
    hover:border-primary/50
    hover:bg-accent
    hover:shadow-md
    active:scale-95
  "
>
  {resolvedTheme === "dark" ? (
    <Sun
      size={18}
      className="
        text-amber-400
        transition-all duration-300
        group-hover:rotate-45 group-hover:scale-110
      "
    />
  ) : (
    <Moon
      size={18}
      className="
        text-indigo-600 dark:text-indigo-400
        transition-all duration-300
        group-hover:-rotate-12 group-hover:scale-110
      "
    />
  )}
</button>
  );
}