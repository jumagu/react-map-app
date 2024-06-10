import { useContext, useLayoutEffect, useRef } from "react";

import { Map } from "mapbox-gl";

import { Loading } from "./Loading";
import { MapContext, PlacesContext, UiContext } from "../contexts";

export const MapView = () => {
  const { handleResultsBoxVisibility } = useContext(UiContext);
  const { setMap } = useContext(MapContext);
  const { isLoading, userLocation } = useContext(PlacesContext);

  const mapDiv = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: mapDiv.current!,
        style: "mapbox://styles/mapbox/dark-v11",
        center: userLocation,
        zoom: 9,
      });

      setMap(map);
    }
  }, [isLoading]);

  if (isLoading) return <Loading />;

  return (
    <div
      ref={mapDiv}
      style={{ width: "100vw", height: "100vh" }}
      onClick={() => handleResultsBoxVisibility(false)}
    ></div>
  );
};
