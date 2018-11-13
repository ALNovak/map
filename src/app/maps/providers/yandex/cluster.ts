import { AbstractMarkerCluster } from "../../abstract/abstract-marker-cluster";
import { BaseMarker } from "../../entity/base-marker";
import * as MarkerClusterer from '@google/markerclustererplus';
import { Injectable } from "@angular/core";
import { IPoint } from "../../interfaces/i-point";

@Injectable()
export class YandexMarkerCluster extends AbstractMarkerCluster {


    yandexCluster: MarkerClusterer;

    constructor() {

        super();
    }

    initMarkerCluster(): void {
        throw new Error("Method not implemented.");
    }
    addMarker(marker: BaseMarker, show?: boolean): void {
        throw new Error("Method not implemented.");
    }
    addMarkers(markers: BaseMarker[], show?: boolean): void {
        throw new Error("Method not implemented.");
    }
    refreshMarkers(): void {
        throw new Error("Method not implemented.");
    }
    removeMarker(marker: BaseMarker) {
        throw new Error("Method not implemented.");
    }
    removeMarkers() {
        throw new Error("Method not implemented.");
    }
    resetViewport(): void {
        throw new Error("Method not implemented.");
    }


}
