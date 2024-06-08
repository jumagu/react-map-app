import { createContext } from "react";

import type { Map } from "mapbox-gl";

interface MapContextType {
  isMapReady: boolean;
  map?: Map;
  setMap: (map: Map) => void;
}

export const MapContext = createContext({} as MapContextType);
