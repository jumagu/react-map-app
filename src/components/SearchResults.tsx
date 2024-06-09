import { useContext, useState } from "react";

import { MapContext, PlacesContext } from "../contexts";

export const SearchResults = () => {
  const { map, getDirections } = useContext(MapContext);
  const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);

  const [activePlace, setActivePlace] = useState("");

  const handlePlaceClick = (coords: number[], placeId: string) => {
    const [lng, lat] = coords;

    map?.flyTo({ zoom: 14, center: [lng, lat] });

    setActivePlace(placeId);
  };

  const handleDirections = (coords: number[]) => {
    if (!userLocation) return;

    const [lng, lat] = coords;

    getDirections(userLocation, [lng, lat]);
  };

  if (isLoadingPlaces)
    return (
      <div className="pico" style={{ marginTop: 16 }}>
        <article
          aria-busy="true"
          style={{ backgroundColor: "transparent" }}
        ></article>
      </div>
    );

  return (
    <div className="results-container">
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

            <button onClick={() => handleDirections(geometry.coordinates)}>
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path className="cls-1" d="M18.46,6H7.54a2,2,0,0,0-2,2V21" />
                  <path
                    className="cls-2"
                    d="M15.54,9,18.4,6.12a.21.21,0,0,0,0-.29L15.54,3"
                  />
                </g>
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
