import { useReducer } from "react";

import { Marker, Popup, type Map } from "mapbox-gl";

import { MapContext } from "./MapContext";
import { mapReducer } from "./mapReducer";

export interface MapState {
  isMapReady: boolean;
  map?: Map;
}

const initialState: MapState = {
  isMapReady: false,
  map: undefined,
};

export const MapProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mapReducer, initialState);

  const setMap = (map: Map) => {
    const currentLocationPopup = new Popup().setHTML(`
        <h4>I'm here</h4>
        <p>In the plater earth</p>
      `);

    new Marker()
      .setLngLat(map.getCenter())
      .setPopup(currentLocationPopup)
      .addTo(map);

    dispatch({ type: "setMap", payload: map });
  };

  return (
    <MapContext.Provider value={{ ...state, setMap }}>
      {children}
    </MapContext.Provider>
  );
};
