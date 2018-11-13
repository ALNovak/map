import { BaseMarker } from "../../entity/base-marker";
import { LeafletMarkerOptions } from "./entity/leaflet-marker-options";
import { Injectable } from "@angular/core";
import { AbstractMap } from "../../abstract/abstract-map";

@Injectable()
export class LeafletMarker extends BaseMarker {
    
    options:LeafletMarkerOptions;

    constructor(options: LeafletMarkerOptions) {
        super(options);
    }

    markerClicked(): void {
        throw new Error("Method not implemented.");
    }

    setMap(map: AbstractMap): void {
        this.map = map;
    }

    setDraggable(draggable: boolean): void{
        
    }
}