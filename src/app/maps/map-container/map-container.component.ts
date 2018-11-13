import { Component } from '@angular/core';
import { MapManager } from '../entity/map-manager';


@Component({
    selector: 'app-map-container',
    templateUrl: './map-container.component.html',
    styleUrls: ['./map-container.component.css']
})
export class MapContainerComponent {

    constructor(private manager: MapManager) {

    }
}

