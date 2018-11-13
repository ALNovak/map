import { AbstractMap } from "../../abstract/abstract-map";
import { IMapOptions } from "../../interfaces/i-map-options";
import { FetchStatus } from "../../enum/e-fetch-status";
import { Observable, Observer } from "rxjs";
import { IApiSettings } from "../../interfaces/i-api-settings";
import { LeafletMapOptions } from "./entity/leaflet-map-options";
import { Injectable } from "@angular/core";
import { LeafletEvent } from "./event";
import { LeafletConfig } from "./config";
import { ReadyStateScript } from "../../enum/e-ready-state-script";
import { LeafletMarkerCluster } from "./cluster";
import { GeoContainer } from "../../entity/geo-container";
import { LeafletSearchMap } from "./search";
import { LeafletRouteBuilder } from "./route";
//import 'leaflet';
//import 'leaflet-css';

declare var L;
declare var document;

@Injectable()
export class LeafletMap extends AbstractMap {
    public get scriptSelector(): string {
        return "script[src*='api.map.baidu']";
    };

    public get styleSelector(): string {
        return ".BMap_mask";
    }

    constructor(mapOptions: LeafletMapOptions, config: LeafletConfig, events: LeafletEvent, cluster: LeafletMarkerCluster, geo: GeoContainer, search: LeafletSearchMap, route: LeafletRouteBuilder) {
        super(mapOptions, config, events, cluster, geo, search, route);

    }

    init(): void {
        this.api = L.map(this.container, this.options);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.api);
    }

    onDataFetched(settings: IApiSettings): Observable<FetchStatus> {

        return new Observable((observer: Observer<FetchStatus>) => {
            this.OnReady();
            observer.next(FetchStatus.SUCCESS);
        });
    }

    private OnReady(): void {
        this.options.center = new L.LatLng(18.45703125, 27.215556209029693);
    }


    destroy(): void {
        super.destroy();
        this.api.remove();
        L = null;

    }

}
