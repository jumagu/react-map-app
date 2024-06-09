import { type ChangeEvent, useRef, useContext } from "react";

import { PlacesContext } from "../contexts";
import { SearchResults } from "./SearchResults";

export const SearchBar = () => {
  const { searchPlacesByTerm } = useContext(PlacesContext);

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
          type="search"
          placeholder="Search for a place"
          onChange={onQueryChange}
        />
      </div>

      <SearchResults />
    </div>
  );
};
