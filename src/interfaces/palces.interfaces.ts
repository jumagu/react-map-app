export interface PlacesResponse {
  type: string;
  features: Feature[];
  attribution: string;
}

export interface Feature {
  type: FeatureType;
  id: string;
  geometry: Geometry;
  properties: Properties;
}

export interface Geometry {
  type: GeometryType;
  coordinates: number[];
}

export enum GeometryType {
  Point = "Point",
}

export interface Properties {
  mapbox_id: string;
  feature_type: string;
  full_address: string;
  name: string;
  name_preferred: string;
  coordinates: Coordinates;
  place_formatted: string;
  bbox: number[];
  context: Context;
}

export interface Context {
  country: Country;
  region: Region;
  postcode?: Postcode;
  locality?: District;
  place?: District;
  district?: District;
  neighborhood?: District;
}

export interface Country {
  mapbox_id: MapboxID;
  name: Name;
  wikidata_id: WikidataID;
  country_code: CountryCode;
  country_code_alpha_3: CountryCodeAlpha3;
}

export enum CountryCode {
  ID = "ID",
  Us = "US",
}

export enum CountryCodeAlpha3 {
  Idn = "IDN",
  Usa = "USA",
}

export enum MapboxID {
  DXJuOm1IeHBsYzpJbWM = "dXJuOm1ieHBsYzpJbWM",
  DXJuOm1IeHBsYzpJdXc = "dXJuOm1ieHBsYzpJdXc",
}

export enum Name {
  Indonesia = "Indonesia",
  UnitedStates = "United States",
}

export enum WikidataID {
  Q252 = "Q252",
  Q30 = "Q30",
}

export interface District {
  mapbox_id: string;
  name: string;
  wikidata_id?: string;
}

export interface Postcode {
  mapbox_id: string;
  name: string;
}

export interface Region {
  mapbox_id: string;
  name: string;
  wikidata_id: string;
  region_code?: string;
  region_code_full?: string;
}

export interface Coordinates {
  longitude: number;
  latitude: number;
}

export enum FeatureType {
  Feature = "Feature",
}
