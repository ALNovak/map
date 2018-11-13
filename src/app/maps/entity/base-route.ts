import { AbstractMap } from "../abstract/abstract-map";
import { IRouteOptions } from "../interfaces/i-route-options";

export class BaseRoute {

    map: AbstractMap;
    options: IRouteOptions;

    constructor(options?: IRouteOptions) {
        this.options = options;
    }

    setMap(map: AbstractMap): void { }
   
  
}