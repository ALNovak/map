import { AbstractMap } from "../abstract/abstract-map";

export class BaseLayer {

    map: AbstractMap;

    setMap(map: AbstractMap): void {

        this.map = map.api;

    }

    getMap(): void {} 

}