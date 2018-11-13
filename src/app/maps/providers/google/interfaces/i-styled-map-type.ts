import { IMapTypeStyle } from "./i-map-type-style";
import { IStyledMapTypeOptions } from "./i-styled-map-type-options";

export interface IStyledMapType {
    constructor(styles: IMapTypeStyle[], options?: IStyledMapTypeOptions);
}