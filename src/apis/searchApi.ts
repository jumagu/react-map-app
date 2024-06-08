import axios from "axios";

const searchApi = axios.create({
  baseURL: "https://api.mapbox.com/search/geocode/v6/forward",
  params: {
    limit: 10,
    access_token: import.meta.env.VITE_MAPBOX_TOKEN,
  },
});

export default searchApi;
