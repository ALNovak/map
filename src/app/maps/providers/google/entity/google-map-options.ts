import { IMapOptions } from "../../../interfaces/i-map-options";
import { IPoint } from "../../../interfaces/i-point";
import { Injectable } from "@angular/core";
import * as styleMap from "../../google/style-map.json";
import { IMapTypeStyle } from "../interfaces/i-map-type-style";

@Injectable()
export class GoogleMapOptions implements IMapOptions {
    enableZoomByDoubleClick: boolean;
    disableDoubleClickZoom: boolean;
    center: IPoint;
    zoom: number;
    minZoom: number;
    enableMapClick: boolean;
    enableAutoResize: boolean;
    allowScrolling: boolean;
    allowZooming: boolean;
    enableScaling: boolean;
    scaleControl: boolean;
    editable: boolean;
    draggable: boolean;
    disableDefaultUI: boolean;
    draggableCursor: string;
    scrollwheel: false;
    styles?: IMapTypeStyle[];

    constructor() {
        this.minZoom = 3;
        this.zoom = 4;
        this.scaleControl = true;
        this.disableDefaultUI = true;
        this.draggableCursor = "default";
        this.styles = styleMap['default'];
    }
}
