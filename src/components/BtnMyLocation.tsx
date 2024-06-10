import { useContext } from "react";

import { MapContext, PlacesContext } from "../contexts";

export const BtnMyLocation = () => {
  const { map, isMapReady } = useContext(MapContext);
  const { userLocation } = useContext(PlacesContext);

  const onClick = () => {
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
