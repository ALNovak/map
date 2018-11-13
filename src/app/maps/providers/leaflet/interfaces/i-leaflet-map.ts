import { IMap } from "../../../interfaces/i-map";
import { IMapOptions } from "../../../interfaces/i-map-options";
import { LeafletConfig } from "../config";
import { LeafletEvent } from "../event";
import { LeafletMap } from "./i-inner";
import { LeafletMarker } from "../marker";
import { LeafletMarkerCluster } from "../cluster";

export interface ILeafletMap {
    instance: LeafletMap;
    config: LeafletConfig;
    events: LeafletEvent;
    marker: LeafletMarker;
    markerCluster: LeafletMarkerCluster;

}