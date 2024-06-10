import { createContext } from "react";

interface UiContextType {
  isResultsBoxVisible: boolean;
  handleResultsBoxVisibility: (isVisible: boolean) => void;
}

export const UiContext = createContext<UiContextType>({} as UiContextType);
