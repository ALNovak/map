import { AbstractMap } from "../abstract/abstract-map";
import { IPolylineOptions } from "../interfaces/i-polyline-options";

export class BasePolyline {

    map: AbstractMap;
    options: IPolylineOptions;

    constructor(options?: IPolylineOptions) {
        this.options = options;
    }

    setMap(map: AbstractMap): void { }
    setOptions(options: IPolylineOptions): void { }
    setRadius(radius: number): void { }
    setVisible(visible: boolean): void { }

}