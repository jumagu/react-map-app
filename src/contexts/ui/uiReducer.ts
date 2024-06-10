import { UiState } from "./UiProvider";

type UiAction = {
  type: "setResultsBoxVisibility";
  payload: boolean;
};

export const uiReducer = (state: UiState, action: UiAction): UiState => {
  switch (action.type) {
    case "setResultsBoxVisibility":
      return {
        ...state,
        isResultsBoxVisible: action.payload,
      };

    default:
      return state;
  }
};
