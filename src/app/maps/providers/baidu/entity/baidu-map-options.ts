import { IMapOptions } from "../../../interfaces/i-map-options";
import { IPoint } from "../../../interfaces/i-point";
import { Injectable } from "@angular/core";
import { MapTypeStyle } from "../../google/interfaces/i-inner";

@Injectable()
export class BaiduMapOptions implements IMapOptions {
    disableDoubleClickZoom: boolean;
    center: IPoint;
    zoom: number;
    minZoom: number;
    enableMapClick: boolean;
    enableAutoResize: boolean;
    allowScrolling: boolean;
    allowZooming: boolean;
    enableScaling: boolean;
    enableZoomByDoubleClick: boolean;
    scaleControl: boolean;
    editable: boolean;
    draggable: boolean;
    disableDefaultUI: boolean;
    draggableCursor: string;
    scrollwheel: false;
    style?: MapTypeStyle[];

    constructor() {
        this.minZoom = 3;
        this.enableMapClick = true;
        this.enableZoomByDoubleClick = false;
        this.enableAutoResize = true;
        this.zoom = 4;
    }
}
