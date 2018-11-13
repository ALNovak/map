import { LatLng } from "../providers/google/interfaces/i-inner";

export interface IPolylineOptions {
    geodesic: boolean;
    path: Array<LatLng>;
    clickable: boolean;
    fillColor: string;
    fillOpacity: number;
    strokeColor: string;
    strokeOpacity: number;
    strokeWeight: number;
}