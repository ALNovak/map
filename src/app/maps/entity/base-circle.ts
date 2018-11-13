import { AbstractMap } from "../abstract/abstract-map";
import { ICircleOptions } from "../interfaces/i-circle-options";

export class BaseCicle {

    map: AbstractMap;
    options: ICircleOptions;

    constructor(options?: ICircleOptions) {
        this.options = options;
    }

    setMap(map: AbstractMap): void { }
    setOptions(options: ICircleOptions): void { }
    bindTo(key: string, target: any, targetKey: string): void { }
    setRadius(radius: number): void { }
    setVisible(visible: boolean): void { }
    setDraggable(draggable: boolean): void {}
    setEditable(editable: boolean): void {}
}