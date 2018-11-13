import { AbstractMap } from "../abstract/abstract-map";
import { IPoint } from "../interfaces/i-point";
import { IBaseMarkerOptions } from "../interfaces/i-base-marker-options";
import { ILatLng } from "../providers/google/interfaces/i-latlng";
import { IHotelInfo } from "../interfaces/i-hotel-info";

export class BaseMarker {

    map: AbstractMap;
    point: IPoint;
	options: IBaseMarkerOptions;
	hotelInfo: IHotelInfo;

    constructor(options: IBaseMarkerOptions) {
        this.options = options;
    }

    markerClicked(): void { }

    setMap(map: AbstractMap): void {

        this.map = map;
    }

    setDraggable(draggable: boolean): void { }

    getPosition(): ILatLng {
        return;
    }

}
