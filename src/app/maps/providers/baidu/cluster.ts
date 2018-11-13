import { AbstractMarkerCluster } from "../../abstract/abstract-marker-cluster";
import { BaseMarker } from "../../entity/base-marker";
import * as MarkerClusterer from '@google/markerclustererplus';
import { Injectable } from "@angular/core";
import { IPoint } from "../../interfaces/i-point";

@Injectable()
export class BaiduMarkerCluster extends AbstractMarkerCluster {

    googleCluster: MarkerClusterer;

    constructor() {

        super();
    }

    initMarkerCluster(): void {

        let mcOptions = {
            gridSize: 100,
            maxZoom: 19,
            zoomOnClick: true,
            ignoreHidden: false,
            styles: [
                {
                    textColor: 'black',
                    url: './assets/icons_map/icon_pointgroup.png',
                    anchorText: [0, -2],
                    height: 44,
                    width: 44
                }]
        };
        this.googleCluster = new MarkerClusterer(this.map.api, [], mcOptions);
    }

    addMarker(marker: BaseMarker, show?: boolean): void {
console.log(show)

        this.googleCluster.addMarker(marker, show);

    }

    addMarkers(markers: Array<BaseMarker>, show?: boolean): void {

        this.googleCluster.addMarkers(markers, show);
    }

    refreshMarkers(): void {

        this.googleCluster.redraw_();

    }

    removeMarker(marker: BaseMarker) {

        this.googleCluster.removeMarker(marker, false);

    }

    removeMarkers() {

        this.googleCluster.clearMarkers();

    }

    resetViewport(): void {

        this.googleCluster.resetViewport_();
    }

}
