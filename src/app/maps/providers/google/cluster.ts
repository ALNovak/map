import { AbstractMarkerCluster } from "../../abstract/abstract-marker-cluster";
import { BaseMarker } from "../../entity/base-marker";
import * as MarkerClusterer from '@google/markerclustererplus';
import { Injectable } from "@angular/core";
import { IPoint } from "../../interfaces/i-point";

@Injectable()
export class GoogleMarkerCluster extends AbstractMarkerCluster {

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
                    url: "data:image/png;base64,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",
                    anchorText: [0, -2],
                    height: 54,
                    width: 54
                }]
        };
        this.googleCluster = new MarkerClusterer.default(this.map.api, [], mcOptions);
    }

    addMarker(marker: BaseMarker, redraw?: boolean): void {

        this.googleCluster.addMarker(marker, redraw);

    }

    addMarkers(markers: Array<BaseMarker>, redraw?: boolean): void {

        this.googleCluster.addMarkers(markers, redraw);
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
