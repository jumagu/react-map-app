import { useContext, useEffect, useReducer } from "react";

import {
  Popup,
  Marker,
  LngLatBounds,
  type Map,
  type AnySourceData,
} from "mapbox-gl";

import { MapContext } from "./MapContext";
import { mapReducer } from "./mapReducer";

import { PlacesContext, ThemeContext } from "..";

import { directionsApi } from "../../apis";
import { DirectionsResponse } from "../../interfaces/directions.interfaces";

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}

const initialState: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

export const MapProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useContext(ThemeContext);
  const { places } = useContext(PlacesContext);

  const [state, dispatch] = useReducer(mapReducer, initialState);

  const setMap = (map: Map) => {
    const currentLocationPopup = new Popup().setHTML(`
        <h4>I'm here</h4>
        <p>In this part of the world</p>
      `);

    new Marker()
      .setLngLat(map.getCenter())
      .setPopup(currentLocationPopup)
      .addTo(map);

    dispatch({ type: "setMap", payload: map });
  };

  const getDirections = async (
    start: [number, number],
    end: [number, number]
  ) => {
    const response = await directionsApi.get<DirectionsResponse>(
      `/${start.join(",")};${end.join(",")}`
    );

    const { distance, duration, geometry } = response.data.routes[0];

    // ? Stats
    let kms = distance / 1000;
    kms = Math.round(kms * 100) / 100;

    const minutes = Math.round(duration / 60);

    console.log({ kms, minutes });

    // ? Bounds
    const bounds = new LngLatBounds(start, start);

    for (const coord of geometry.coordinates) {
      const newCoord: [number, number] = [coord[0], coord[1]];

      bounds.extend(newCoord);
    }

    state.map?.fitBounds(bounds, { padding: 100 });

    // ? Polyline
    const sourceData: AnySourceData = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: geometry.coordinates,
            },
          },
        ],
      },
    };

    if (state.map?.getLayer("route")) {
      state.map?.removeLayer("route");
      state.map.removeSource("route");
    }

    state.map?.addSource("route", sourceData);

    state.map?.addLayer({
      id: "route",
      type: "line",
      source: "route",
      layout: { "line-cap": "round", "line-join": "round" },
      paint: { "line-color": "#3887be", "line-width": 5 },
    });
  };

  useEffect(() => {
    state.markers.forEach((marker) => marker.remove());

    const newMarkers: Marker[] = [];

    for (const place of places) {
      const [lng, lat] = place.geometry.coordinates;

      const popup = new Popup().setHTML(`
        <h4>${place.properties.name}</h4>
        <p>${place.properties.full_address}</p>
      `);

      const newMarker = new Marker()
        .setPopup(popup)
        .setLngLat([lng, lat])
        .addTo(state.map!);

      newMarkers.push(newMarker);
    }

    dispatch({ type: "setMarkers", payload: newMarkers });
  }, [places]);

  useEffect(() => {
    if (state.map?.getLayer("route") && !places.length) {
      state.map?.removeLayer("route");
      state.map.removeSource("route");
    }
  }, [places]);

  useEffect(() => {
    if (state.isMapReady) {
      state.map?.setStyle(`mapbox://styles/mapbox/${theme}-v11`);
    }
  }, [theme]);

  return (
    <MapContext.Provider value={{ ...state, setMap, getDirections }}>
      {children}
    </MapContext.Provider>
  );
};
