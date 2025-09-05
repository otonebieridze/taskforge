import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  isDark: boolean;
  setIsDark: (val: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem("theme");
      return stored ? stored === "dark" : false;
    } catch (error) {
      console.error("Failed to parse theme from localStorage", error);
      return false;
    }
  });

  useEffect(() => {
    try {
      document.documentElement.classList.toggle("dark", isDark);
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch (error) {
      console.error("Failed to save theme to localStorage", error);
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
