import { AbstractMarkerCluster } from "../../abstract/abstract-marker-cluster";
import { BaseMarker } from "../../entity/base-marker";
import { Injectable } from "@angular/core";
import { IPoint } from "../../interfaces/i-point";

declare var L

@Injectable()

export class LeafletMarkerCluster extends AbstractMarkerCluster {

    leafletCluster: any;

    constructor() {
        super();
    }

    initMarkerCluster(): void {
        this.leafletCluster = L.markerClusterGroup({
            chunkedLoading: false,
            maxClusterRadius: 120,
            iconCreateFunction: function (cluster) {
                var markers = cluster.getAllChildMarkers();
                var html = '<div class="markerClusLeaftlet">' + markers.length + '</div>';
                return L.divIcon({ html: html, className: 'mycluster', iconSize: L.point(44, 44) });
            },
        });

        this.map.api.addLayer([]);
    }

    addMarker(marker: BaseMarker, show?: boolean): void {
        this.leafletCluster.addMarker(marker, show);

    }

    addMarkers(markers: Array<BaseMarker>, show?: boolean): void {
        this.leafletCluster.addMarker(markers, show);
    }

    refreshMarkers(): void {
        this.leafletCluster.redraw_();

    }

    removeMarker(marker: BaseMarker) {
        this.leafletCluster.removeMarker(marker, false);

    }

    removeMarkers() {
        this.leafletCluster.clearMarkers();

    }

    resetViewport(): void {
        this.leafletCluster.resetViewport_();
    }

}
