
"use client";

import { useTheme } from "next-themes";

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      className="
        rounded-lg border p-2
        bg-background text-foreground
        border-border
        dark:border-gray-700
      "
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="system">System</option>
    </select>
  );
}
