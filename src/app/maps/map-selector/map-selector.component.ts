import { Component, Injectable } from '@angular/core';
import { MapType } from '../enum/e-map-type';
import { MapManager } from '../entity/map-manager';
import { mapInfoForSelect } from '../entity/map-info-select';

@Component({
  selector: 'app-map-selector',
  templateUrl: './map-selector.component.html',
  styleUrls: ['./map-selector.component.css'],
})
export class MapSelectorComponent {
  selectedMap = MapType.GOOGLE
  mapsEnum: MapType;
  mapInfo: mapInfoForSelect[];

  constructor(private manager: MapManager) {
    this.mapInfo = this.mapList('GOOGLE');
  }

  private mapList(nameMap: string): mapInfoForSelect[] {

    let temp: mapInfoForSelect[] = Object.keys(MapType)
      .filter((type) => isNaN(<any>type))
      .map<mapInfoForSelect>(
        (type) => {
          let info: mapInfoForSelect = new mapInfoForSelect();
          info.value = type;
          info.name = type.toLowerCase();
          info.active = type === nameMap;
          return info;
         
        });

    return temp;
  }

  public selectMap(type: string) {
    
    this.mapInfo = this.mapList(type);
    this.selectedMap = MapType[type];
    this.manager.changeType(MapType[type]);
    this.InitMap(MapType[type]);
    
  }

  public InitMap(mapType: MapType) {

    this.manager.selectMap(mapType);
  }

  ngAfterViewInit(): void {

    this.InitMap(MapType.GOOGLE);

  }
}
