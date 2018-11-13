import { AbstractMap } from '../abstract/abstract-map';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IInitMap } from '../interfaces/i-init-map';
import { EventsMapEmitter } from "../entity/event-emitter";

@Injectable()
export abstract class AbstractEvent implements IInitMap {

    map: AbstractMap;

    protected abstract listen<E>(eventName: string): Observable<E>;

    abstract idle<E>(): Observable<E>;
    abstract mapClicked<IEventClikMap>(): Observable<IEventClikMap>;
    abstract zoomFinished<E>(): Observable<E>;
    abstract dragFinished<E>(): Observable<E>;
    abstract boundsChanged<E>(): Observable<E>;
    abstract zoomChanged<E>(): Observable<E>;

    initMap(map: AbstractMap): void {

        this.map = map;
       
    }
}