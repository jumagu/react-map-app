import React from "react";
import ReactDOM from "react-dom/client";

import "./styles.css";

import MapsApp from "./MapsApp.tsx";

import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

if (!navigator.geolocation) {
  alert(
    "You have not provided access to browser geolocation or your browser does not support this feature."
  );
  throw new Error(
    "You have not provided access to browser geolocation or your browser does not support this feature."
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
);
