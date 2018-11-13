import { ILatLng } from "./i-latlng";

export interface IEventClickMap {
    latLng: ILatLng;
    placeId: string;
    stop():void;
}
