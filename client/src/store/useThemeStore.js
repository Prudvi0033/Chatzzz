import { create } from "zustand";
import { useEffect } from "react";

export const useThemeStore = create((set) => ({
  theme: "business", 
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));

export const useInitializeTheme = () => {
  const setTheme = useThemeStore((state) => state.setTheme);

  useEffect(() => {
    const storedTheme = localStorage.getItem("chat-theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, [setTheme]);
};
