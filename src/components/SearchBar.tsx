import { type ChangeEvent, useRef, useContext } from "react";

import { PlacesContext, UiContext } from "../contexts";
import { SearchResults } from "./SearchResults";

export const SearchBar = () => {
  const { handleResultsBoxVisibility } = useContext(UiContext);
  const { searchPlacesByTerm, userLocation } = useContext(PlacesContext);

  const debounceRef = useRef<NodeJS.Timeout>();

  const onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      searchPlacesByTerm(event.target.value);
    }, 500);
  };

  return (
    <div className="search-container">
      <div className="pico">
        <input
          className="search-input"
          type="search"
          placeholder="Search for a place"
          disabled={!userLocation}
          onChange={onQueryChange}
          onFocus={() => handleResultsBoxVisibility(true)}
        />
      </div>

      <SearchResults />
    </div>
  );
};
