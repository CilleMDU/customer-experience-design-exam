import { useEffect, useState } from "react";
import { DarkModeContext } from "./darkMode.jsx";

export function DarkModeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) return saved === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", isDark);
  }, [isDark]);

  return (
    <DarkModeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </DarkModeContext.Provider>
  );
}
