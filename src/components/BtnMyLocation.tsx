import { useContext } from "react";

import { MapContext, PlacesContext, UiContext } from "../contexts";

export const BtnMyLocation = () => {
  const { handleResultsBoxVisibility } = useContext(UiContext);
  const { map, isMapReady } = useContext(MapContext);
  const { userLocation } = useContext(PlacesContext);

  const onClick = () => {
    handleResultsBoxVisibility(false);

    if (!isMapReady) throw new Error("Map is not ready");
    if (!userLocation) throw new Error("");

    map?.flyTo({ zoom: 14, center: userLocation });
  };

  return (
    <div className="pico">
      <button className="fab-my-location" onClick={onClick}>
        My Location
      </button>
    </div>
  );
};
