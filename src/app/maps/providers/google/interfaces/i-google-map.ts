import {IMap} from "../../../interfaces/i-map";
import { IMapOptions } from "../../../interfaces/i-map-options";
import { GoogleConfig } from "../config";
import { GoogleEvent } from "../event";
import { GoogleMap } from "../../../providers/google/interfaces/i-inner";
import { GoogleMarker } from "../marker";
import {GoogleMarkerCluster} from "../cluster";

export interface IGoogleMap {
    
    instance: GoogleMap;   
    config: GoogleConfig;
    events: GoogleEvent;
    marker: GoogleMarker;
    markerCluster: GoogleMarkerCluster;

}