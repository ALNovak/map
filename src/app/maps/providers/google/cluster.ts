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
                    height: 44,
                    width: 44
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
