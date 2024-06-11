import { useContext, useLayoutEffect, useRef } from "react";

import { Map } from "mapbox-gl";

import { Loading } from "./Loading";
import {
  UiContext,
  MapContext,
  ThemeContext,
  PlacesContext,
} from "../contexts";

export const MapView = () => {
  const { theme } = useContext(ThemeContext);
  const { handleResultsBoxVisibility } = useContext(UiContext);
  const { setMap } = useContext(MapContext);
  const { isLoading, userLocation } = useContext(PlacesContext);

  const mapDiv = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isLoading && userLocation) {
      const map = new Map({
        container: mapDiv.current!,
        style: `mapbox://styles/mapbox/${theme}-v11`,
        center: userLocation,
        zoom: 9,
      });

      setMap(map);
    }
  }, [isLoading]);

  if (isLoading)
    return (
      <Loading
        containerClassName="pico"
        containerStyle={{ height: "100vh" }}
        spinnerStyle={{
          margin: "0",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    );

  if (!userLocation)
    return (
      <div className="pico location-denied-alert">
        <p>
          Sorry, you can't continue if you don't accept to use the browser
          geolocation :(
        </p>
      </div>
    );

  return (
    <div
      ref={mapDiv}
      style={{ width: "100vw", height: "100vh" }}
      onClick={() => handleResultsBoxVisibility(false)}
    ></div>
  );
};
