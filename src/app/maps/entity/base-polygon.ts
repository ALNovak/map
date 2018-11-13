import { AbstractMap } from "../abstract/abstract-map";
import { IPolygonOptions } from "../interfaces/i-polygon";
import { LatLng } from "../providers/google/interfaces/i-inner";

export class BasePolygon {

    map: AbstractMap;
    options: IPolygonOptions;

    constructor(options?: IPolygonOptions) {
        this.options = options;
    }


    getPath(): Array<LatLng> { return  }
    setMap(map: AbstractMap): void { }
    setOptions(options: IPolygonOptions): void { }
    setRadius(radius: number): void { }
    setVisible(visible: boolean): void { }
    
}