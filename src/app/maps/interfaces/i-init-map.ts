import { AbstractMap } from "../abstract/abstract-map";

export interface IInitMap {
    map: AbstractMap;
    initMap(map: AbstractMap): void;
}