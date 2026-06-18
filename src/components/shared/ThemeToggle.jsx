"use client";

import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  if (!resolvedTheme) {
    return (
      <div className="w-10 h-10 rounded-xl border border-slate-300 dark:border-slate-700" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
      flex items-center justify-center
      w-10 h-10
      rounded-xl
      border
      border-slate-300
      dark:border-slate-700
      bg-white
      dark:bg-slate-800
      text-slate-700
      dark:text-yellow-400
      hover:scale-105
      transition-all
      duration-200
      cursor-pointer
      "
      aria-label="Toggle Theme"
    >
      {isDark ? <FaSun size={16} /> : <FaMoon size={16} />}
    </button>
  );
}
