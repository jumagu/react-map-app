import { MainScreen } from "./screens";
import { MapProvider, PlacesProvider } from "./contexts";

export default function MapsApp() {
  return (
    <PlacesProvider>
      <MapProvider>
        <MainScreen />
      </MapProvider>
    </PlacesProvider>
  );
}
