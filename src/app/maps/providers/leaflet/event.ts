import { AbstractEvent } from "../../abstract/abstract-event";
import { Observable, Observer } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class LeafletEvent extends AbstractEvent {
    constructor() { 
        super();   
    }

    listen<E>(eventName: string): Observable<E> {
        return new Observable((observer: Observer<E>) => {
            this.map.api.addEventListener(eventName, (arg: E) => { observer.next(arg); });
        });
    }

    idle<E>(): Observable<E> {
        return this.listen<E>('idle');
    }

    mapClicked<E>(): Observable<E> {
        return this.listen<E>('click');
    }

    zoomFinished<E>(): Observable<E> {
        return this.listen<E>('zoomend');
    }

    dragFinished<E>(): Observable<E> {
        return this.listen<E>('dragend');
    }

    boundsChanged<E>(): Observable<E> {
        return this.listen<E>('boundscnhage');
    }

    zoomChanged <E>(): Observable<E> {
        return this.listen<E>('zoomstart');
    }
}