import {IMap} from "../../../interfaces/i-map";
import { IMapOptions } from "../../../interfaces/i-map-options";
import { BaiduConfig } from "../config";
import { BaiduEvent } from "../event";
import { BaiduMap } from "./i-inner";
import { BaiduMarker } from "../marker";
import {BaiduMarkerCluster} from "../cluster";

export interface IBaiduMap {
    
    instance: BaiduMap;   
    config: BaiduConfig;
    events: BaiduEvent;
    marker: BaiduMarker;
    markerCluster: BaiduMarkerCluster;

}