import { IMap } from "../../../interfaces/i-map";
import { IMapOptions } from "../../../interfaces/i-map-options";
import { YandexConfig } from "../config";
import { YandexEvent } from "../event";
import { YandexMap } from "./i-inner";
import { YandexMarker } from "../marker";
import { YandexMarkerCluster } from "../cluster";

export interface IYandexMap {

    instance: YandexMap;
    config: YandexConfig;
    events: YandexEvent;
    marker: YandexMarker;
    markerCluster: YandexMarkerCluster;

}