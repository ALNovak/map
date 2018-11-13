import { AbstractMap } from "./abstract-map";
import { IMarkerClusterOptions } from '../interfaces/i-marker-cluster-options';
import { IPoint } from "../interfaces/i-point";
import { BaseMarker } from "../entity/base-marker";
import { Injectable } from "@angular/core";
import { GoogleMarkerCluster } from "../providers/google/cluster";

@Injectable()
export abstract class AbstractMarkerCluster {

    map: AbstractMap;
    cluster: Array<IPoint>;
    preferences: IMarkerClusterOptions;
    googleCluster:GoogleMarkerCluster;

    abstract initMarkerCluster():void;

    abstract addMarker(marker: BaseMarker, show?: boolean): void;

    abstract addMarkers(markers: Array<BaseMarker>, show?: boolean): void;

    abstract refreshMarkers(): void;

    abstract removeMarker(marker: BaseMarker);

    abstract removeMarkers();

    abstract resetViewport(): void;

    initMap(map: AbstractMap): void {

        this.map = map;
    }

}
