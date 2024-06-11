import { createContext } from "react";

interface ThemeContextType {
  theme: string;
  switchTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType
);
