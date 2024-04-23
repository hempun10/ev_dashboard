export interface Station {
  id: number;
  title: string;
  openingtime: string;
  images?: Images | null;
  chagerType: string;
  totalPorts: number;
  availablePorts: number;
  logoUrl?: null;
  rating: number;
  ratingCount: number;
  isAvailable: number;
  StationMessage: string;
  latitude: number;
  longitude: number;
  address: string;
  code: string;
}
export interface Images {
  type: string;
  data?: number[] | null;
}
