import { useContext } from "react";
import { DarkModeContext } from "../context/darkMode.jsx";

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within DarkModeProvider");
  }
  return context;
}
