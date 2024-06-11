import { useEffect, useState } from "react";

import useLocalStorageState from "use-local-storage-state";
import usePrefersColorScheme from "use-prefers-color-scheme";

import { ThemeContext } from "./ThemeContext";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const isSSR = typeof window === "undefined";
  const htmlTag = !isSSR && document.querySelector("html");

  const systemPrefersColorScheme = usePrefersColorScheme();
  const defaultTheme = systemPrefersColorScheme || "light";

  const [theme, setTheme] = useState("light");
  const [selectedTheme, setSelectedTheme] =
    useLocalStorageState("picoColorScheme");

  const switchTheme = () => {
    setSelectedTheme(theme === "dark" ? "light" : "dark");
  };

  const setDataThemeAttribute = (theme: string) => {
    if (htmlTag) {
      htmlTag.setAttribute("data-theme", theme);
    }
  };

  useEffect(() => {
    if (htmlTag) {
      if (selectedTheme) {
        setDataThemeAttribute(selectedTheme as string);
        setTheme(selectedTheme as string);
      } else {
        setDataThemeAttribute(defaultTheme);
        setTheme(defaultTheme);
      }
    }
  }, [htmlTag, defaultTheme, selectedTheme]);

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
