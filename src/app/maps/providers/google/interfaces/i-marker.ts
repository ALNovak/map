import { GoogleMap } from "../map";
import { LatLng, LatLngLiteral, MarkerLabel, MarkerOptions } from "./i-inner";

export interface IGoogleMarker {
    constructor(options?: MarkerOptions): void;
    setMap(map: GoogleMap): void;
    setPosition(latLng: LatLng|LatLngLiteral): void;
    setTitle(title: string): void;
    setLabel(label: string|MarkerLabel): void;
    setDraggable(draggable: boolean): void;
    setIcon(icon: string): void;
    setOpacity(opacity: number): void;
    setVisible(visible: boolean): void;
    setZIndex(zIndex: number): void;
    setAnimation(animation: any): void;
    getLabel(): MarkerLabel;
    setClickable(clickable: boolean): void;
  }