import {
  MapView,
  SearchBar,
  BtnMyLocation,
  ColorSchemeSwitcher,
} from "../components";

export const MainScreen = () => {
  return (
    <>
      <MapView />
      <SearchBar />
      <BtnMyLocation />
      <ColorSchemeSwitcher className="fab-theme-switcher" />
    </>
  );
};
