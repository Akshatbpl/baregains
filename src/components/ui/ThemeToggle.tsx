import { Moon, Sun } from "lucide-react";

import { useThemeStore } from "../../stores/themeStore";

function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex w-full items-center gap-3 rounded-md border border-(--border) px-3 py-2.5 text-sm font-medium text-(--text-secondary) transition-colors hover:bg-(--surface-subtle) hover:text-(--text-primary) focus:outline-none focus-visible:ring-2 focus-visible:ring-(--brand)"
    >
      {isDark ? (
        <Sun size={18} strokeWidth={1.9} />
      ) : (
        <Moon size={18} strokeWidth={1.9} />
      )}

      {isDark ? "Light mode" : "Dark mode"}
    </button>
  );
}

export default ThemeToggle;