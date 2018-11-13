import { AbstractSearch } from "../../abstract/abstract-search";
import { Injectable } from "@angular/core";
import { IPoint } from "../../interfaces/i-point";
import { Observable } from "rxjs";


@Injectable()
export class YandexSearchMap extends AbstractSearch {
    searchDetails(placeId: string): Observable<IPoint> {
        throw new Error("Method not implemented.");
    }

    search(query: string): IPoint[] {
        throw new Error("Method not implemented.");
    }

}