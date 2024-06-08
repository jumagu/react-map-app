import { useEffect, useReducer } from "react";

import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";

import { getUserLocation } from "../../helpers";
import { searchApi } from "../../apis";

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
}

const initialState: PlacesState = {
  isLoading: true,
  userLocation: undefined,
};

export const PlacesProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(placesReducer, initialState);

  useEffect(() => {
    getUserLocation().then((coords) =>
      dispatch({ type: "setUserLocation", payload: coords })
    );
  }, []);

  const searchPlacesByTerm = async (searchTerm: string) => {
    if (searchTerm.length === 0) return []; // todo: clear state
    if (!state.userLocation) throw new Error("No user location.");

    const response = await searchApi.get("", {
      params: {
        q: searchTerm,
        proximity: state.userLocation.join(","),
      },
    });

    console.log(response.data);
  };

  return (
    <PlacesContext.Provider value={{ ...state, searchPlacesByTerm }}>
      {children}
    </PlacesContext.Provider>
  );
};
