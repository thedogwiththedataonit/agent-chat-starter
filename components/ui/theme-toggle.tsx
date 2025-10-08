"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

// Lightweight dark-mode toggle using next-themes.
export default function ThemeToggle(): React.ReactElement {
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Determine current display icon based on theme
  const isDark = resolvedTheme === "dark";

  const toggle = () => {
    // If system is used, switch to light/dark explicitly
    const next = isDark ? "light" : "dark";
    setTheme(next);
  };

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={toggle}
      className="inline-flex items-center justify-center h-9 px-3 py-2 rounded-md border border-border bg-background text-foreground shadow-xs hover:bg-accent hover:text-accent-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}

