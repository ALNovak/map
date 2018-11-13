import { BaseMarker } from "../../entity/base-marker";
import { GoogleMarkerOptions } from "./entity/google-marker-options";
import { Injectable } from "@angular/core";
import { AbstractMap } from "../../abstract/abstract-map";

@Injectable()
export class GoogleMarker extends BaseMarker {

    options: GoogleMarkerOptions;

    constructor(options: GoogleMarkerOptions) {
        super(options);
    }

    markerClicked(): void {
        throw new Error("Method not implemented.");
    }

    setMap(map: AbstractMap): void {}

    setDraggable(draggable: boolean): void {}
}