export interface ILatLng {
    constructor(lat: number, lng: number): void;
    lat(): number;
    lng(): number;
}