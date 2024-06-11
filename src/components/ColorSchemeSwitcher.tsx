import { useContext, type MouseEvent } from "react";

import { ThemeContext } from "../contexts";
import { IconMoon, IconSun } from "../icons";

export const ColorSchemeSwitcher = ({ className }: { className?: string }) => {
  const { switchTheme, theme } = useContext(ThemeContext);
  const nextThemeLabel =
    theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";

  const handleSwitchTheme = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    switchTheme();
  };

  return (
    <div className="pico">
      <button
        className={className}
        aria-label={nextThemeLabel}
        onClick={handleSwitchTheme}
      >
        {theme === "dark" ? <IconSun /> : <IconMoon />}
      </button>
    </div>
  );
};
