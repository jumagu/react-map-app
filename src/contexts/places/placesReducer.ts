import { PlacesState } from "./PlacesProvider";

import { Feature } from "../../interfaces/palces.interfaces";

type PlacesAction =
  | {
      type: "setUserLocation";
      payload: [number, number] | undefined;
    }
  | { type: "setPlaces"; payload: Feature[] }
  | { type: "setIsLoadingPlaces" };

export const placesReducer = (
  state: PlacesState,
  action: PlacesAction
): PlacesState => {
  switch (action.type) {
    case "setUserLocation":
      return {
        ...state,
        isLoading: false,
        userLocation: action.payload,
      };

    case "setPlaces":
      return {
        ...state,
        isLoadingPlaces: false,
        places: action.payload,
      };

    case "setIsLoadingPlaces":
      return {
        ...state,
        isLoadingPlaces: true,
        places: [],
      };

    default:
      return state;
  }
};
