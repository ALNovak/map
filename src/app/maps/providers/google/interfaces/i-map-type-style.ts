import { IMapTypeStyleElementType } from "./i-map-type-style-element-type";
import { IMapTypeStyleFeatureType } from "./i-map-type-style-feature-fype";
import { IMapTypeStyler } from "./i-map-type-styler";

export interface IMapTypeStyle {
    elementType?: IMapTypeStyleElementType;
    featureType?: IMapTypeStyleFeatureType;
    stylers?: IMapTypeStyler[];
}
