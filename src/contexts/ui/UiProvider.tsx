import { useReducer } from "react";

import { UiContext } from "./UiContext";
import { uiReducer } from "./uiReducer";

export interface UiState {
  isResultsBoxVisible: boolean;
}

const initialState: UiState = {
  isResultsBoxVisible: false,
};

export const UiProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const handleResultsBoxVisibility = (isVisible: boolean) => {
    dispatch({ type: "setResultsBoxVisibility", payload: isVisible });
  };

  return (
    <UiContext.Provider value={{ ...state, handleResultsBoxVisibility }}>
      {children}
    </UiContext.Provider>
  );
};
