import { createContext } from "react";

interface PlacesContextType {
  isLoading: boolean;
  userLocation?: [number, number];
  searchPlacesByTerm: (query: string) => Promise<any>;
}

export const PlacesContext = createContext<PlacesContextType>(
  {} as PlacesContextType
);
