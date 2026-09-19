import { NavLink } from "react-router-dom";

import { navigationItems } from "./navigation";

function MobileNavigation() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-(--border) bg-(--surface)/95 px-2 pb-[env(safe-area-inset-bottom)] pt-2 backdrop-blur lg:hidden"
      aria-label="Mobile navigation"
    >
      <div className="mx-auto flex max-w-lg items-center justify-around">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                [
                  "flex min-w-16 flex-col items-center gap-1 rounded-lg px-2 py-1.5 text-[11px] font-medium transition-colors",
                  isActive
                    ? "text-(--brand)"
                    : "text-(--text-muted) hover:text-(--text-primary)",
                ].join(" ")
              }
            >
              <Icon size={19} strokeWidth={2} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

export default MobileNavigation;