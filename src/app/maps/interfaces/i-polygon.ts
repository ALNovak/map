import { IPoint } from "./i-point";

export interface IPolygonOptions {
    path: Array<IPoint>;
    strokeColor: string;
    strokeOpacity: number;
    strokeWeight: number;
    fillColor: string;
    fillOpacity: number;
}

