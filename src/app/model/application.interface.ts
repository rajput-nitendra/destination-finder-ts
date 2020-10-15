export interface AirportLocation {
  code: string;
  name: string;
  description: string;
  coordinates: Coordinates;
  parent: Parent;
  children?: any;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Parent {
  code: string;
  name: string;
  description: string;
  coordinates: Coordinates;
  parent: Parent;
  children?: any;
}

export interface Fare {
  amount: number;
  currency: string;
  origin: string;
  destination: string;
}

export interface CurrencySymbol {
  code: string;
  symbol: any;
}
