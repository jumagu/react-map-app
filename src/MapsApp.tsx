import { MainScreen } from "./screens";
import { MapProvider, PlacesProvider, UiProvider } from "./contexts";

export default function MapsApp() {
  return (
    <UiProvider>
      <PlacesProvider>
        <MapProvider>
          <MainScreen />
        </MapProvider>
      </PlacesProvider>
    </UiProvider>
  );
}
