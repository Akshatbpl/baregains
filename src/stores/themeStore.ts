import { create } from "zustand";

export type Theme = "light" | "dark";

type ThemeState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

const initialTheme: Theme =
  localStorage.getItem("baregains-theme") === "dark" ? "dark" : "light";

applyTheme(initialTheme);

export const useThemeStore = create<ThemeState>((set) => ({
  theme: initialTheme,

  setTheme: (theme) => {
    localStorage.setItem("baregains-theme", theme);
    applyTheme(theme);
    set({ theme });
  },

  toggleTheme: () => {
    set((state) => {
      const theme = state.theme === "light" ? "dark" : "light";

      localStorage.setItem("baregains-theme", theme);
      applyTheme(theme);

      return { theme };
    });
  },
}));