import { MainScreen } from "./screens";
import {
  UiProvider,
  MapProvider,
  ThemeProvider,
  PlacesProvider,
} from "./contexts";

export default function MapsApp() {
  return (
    <ThemeProvider>
      <UiProvider>
        <PlacesProvider>
          <MapProvider>
            <MainScreen />
          </MapProvider>
        </PlacesProvider>
      </UiProvider>
    </ThemeProvider>
  );
}
