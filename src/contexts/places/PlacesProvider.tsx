import { useEffect, useReducer } from "react";

import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";

import { searchApi } from "../../apis";
import { getUserLocation } from "../../helpers";
import { Feature, PlacesResponse } from "../../interfaces/palces.interfaces";

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[];
}

const initialState: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: [],
};

export const PlacesProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(placesReducer, initialState);

  useEffect(() => {
    getUserLocation().then((coords) =>
      dispatch({ type: "setUserLocation", payload: coords })
    );
  }, []);

  const searchPlacesByTerm = async (searchTerm: string) => {
    if (!state.userLocation) throw new Error("No user location.");

    if (searchTerm.length === 0) dispatch({ type: "setPlaces", payload: [] });

    dispatch({ type: "setIsLoadingPlaces" });

    const response = await searchApi.get<PlacesResponse>("", {
      params: {
        q: searchTerm,
        proximity: state.userLocation.join(","),
      },
    });

    dispatch({ type: "setPlaces", payload: response.data.features });
  };

  return (
    <PlacesContext.Provider value={{ ...state, searchPlacesByTerm }}>
      {children}
    </PlacesContext.Provider>
  );
};
