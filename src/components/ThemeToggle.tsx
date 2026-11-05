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
        className="rounded-full border p-2"
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
        rounded-full border p-2
        hover:bg-gray-100
        dark:hover:bg-gray-800
      "
    >
      {resolvedTheme === "dark" ? (
        <Sun size={20} />
      ) : (
        <Moon size={20} />
      )}
    </button>
  );
}