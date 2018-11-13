import { AbstractMap } from "./abstract-map";
import { IPoint } from "../interfaces/i-point";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export abstract class AbstractSearch {

    map: AbstractMap;

    abstract search(query: string): Array<IPoint>;

    abstract searchDetails(placeId: string): Observable<IPoint>;

    initMap(map: AbstractMap): void {

        this.map = map;
    }
}
