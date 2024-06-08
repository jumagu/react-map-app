import { type ChangeEvent, useRef, useContext } from "react";

import { PlacesContext } from "../contexts";

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
    <div className="pico">
      <div className="search-container">
        <input
          type="search"
          placeholder="Search for a place"
          onChange={onQueryChange}
        />
      </div>
    </div>
  );
};
