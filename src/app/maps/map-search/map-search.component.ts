import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MapManager } from '../entity/map-manager';
import { MatAutocompleteTrigger } from '@angular/material';
import { Point } from '../entity/point';
import { TypeRoute } from '../enum/e-type-route';
import { IPoint } from '../interfaces/i-point';

let pointFrom: IPoint;
let pointTo: IPoint;

@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.css']
})

export class MapSearchComponent {

}
