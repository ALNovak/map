import { BaseMarker } from "../../entity/base-marker";
import { BaiduMarkerOptions } from "./entity/yandex-marker-options";
import { Injectable } from "@angular/core";
import { AbstractMap } from "../../abstract/abstract-map";

@Injectable()
export class YandexMarker extends BaseMarker {

    options: BaiduMarkerOptions;

    constructor(options: BaiduMarkerOptions) {
        super(options);
    }

    markerClicked(): void {
        throw new Error("Method not implemented.");
    }

    setMap(map: AbstractMap): void {
        this.map = map;
    }

    setDraggable(draggable: boolean): void {
        throw new Error("Method not implemented.");
    }
}