import { createContext } from "react";

import { Feature } from "../../interfaces/palces.interfaces";

interface PlacesContextType {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[];
  searchPlacesByTerm: (query: string) => void;
}

export const PlacesContext = createContext<PlacesContextType>(
  {} as PlacesContextType
);
