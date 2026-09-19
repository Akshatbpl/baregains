import { NavLink } from "react-router-dom";

import { navigationItems } from "./navigation";
import ThemeToggle from "../ui/ThemeToggle";

function DesktopSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-(--border) bg-(--surface) lg:flex lg:flex-col">
      <div className="border-b border-(--border) px-6 py-5">
        <NavLink
          to="/"
          className="text-xl font-bold tracking-tight text-(--text-primary)"
        >
          BareGains
        </NavLink>

        <p className="mt-1 text-xs text-(--text-muted)">
          Build your way up.
        </p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Primary">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-(--brand-soft) text-(--brand)"
                    : "text-(--text-secondary) hover:bg-(--surface-subtle) hover:text-(--text-primary)",
                ].join(" ")
              }
            >
              <Icon size={18} strokeWidth={2} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-(--border) p-4">
        <ThemeToggle />
      </div>
    </aside>
  );
}

export default DesktopSidebar;