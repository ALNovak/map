import { ILatLng } from "./i-latlng";
import { ILatLngBoundsLiteral } from "./i-latlng-bounds-literal";

export interface ILatLngBounds {
    contains(latLng: ILatLng): boolean;
    equals(other: ILatLngBounds|ILatLngBoundsLiteral): boolean;
    extend(point: ILatLng): void;
    getCenter(): ILatLng;
    getNorthEast(): ILatLng;
    getSouthWest(): ILatLng;
    intersects(other: ILatLngBounds|ILatLngBoundsLiteral): boolean;
    isEmpty(): boolean;
    toJSON(): ILatLngBoundsLiteral;
    toSpan(): ILatLng;
    toString(): string;
    toUrlValue(precision?: number): string;
    union(other: ILatLngBounds|ILatLngBoundsLiteral): ILatLngBounds;
  }