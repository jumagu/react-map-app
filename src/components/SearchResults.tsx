import { useContext, useState } from "react";

import { Loading } from "./Loading";
import { IconDirections } from "../icons";
import { MapContext, PlacesContext, UiContext } from "../contexts";

export const SearchResults = () => {
  const { isResultsBoxVisible, handleResultsBoxVisibility } =
    useContext(UiContext);
  const { map, getDirections } = useContext(MapContext);
  const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);

  const [activePlace, setActivePlace] = useState("");

  const handlePlaceClick = (coords: number[], placeId: string) => {
    handleResultsBoxVisibility(false);

    const [lng, lat] = coords;

    map?.flyTo({ zoom: 14, center: [lng, lat] });

    setActivePlace(placeId);
  };

  const handleDirections = (coords: number[]) => {
    if (!userLocation) return;

    const [lng, lat] = coords;

    getDirections(userLocation, [lng, lat]);
  };

  return (
    <div
      className={`results-container ${!isResultsBoxVisible ? "hidden" : ""}`}
    >
      {isLoadingPlaces ? (
        <Loading
          containerClassName="pico"
          containerStyle={{ marginTop: 16 }}
          spinnerStyle={{ backgroundColor: "transparent", boxShadow: "none" }}
        />
      ) : (
        <ul className="results-list">
          {places.map(({ id, properties, geometry }) => (
            <li
              key={id}
              className={`result-item ${activePlace === id ? "active" : ""}`}
              onClick={() => handlePlaceClick(geometry.coordinates, id)}
            >
              <div>
                <h3>{properties.name}</h3>
                <p>{properties.full_address}</p>
              </div>

              <div>
                <button onClick={() => handleDirections(geometry.coordinates)}>
                  <IconDirections />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
