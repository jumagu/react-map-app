import { createContext } from "react";

import type { Map } from "mapbox-gl";

interface MapContextType {
  isMapReady: boolean;
  map?: Map;
  setMap: (map: Map) => void;
  getDirections: (
    start: [number, number],
    end: [number, number]
  ) => Promise<void>;
}

export const MapContext = createContext({} as MapContextType);
