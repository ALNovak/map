import { IIcon } from "./i-icon";

export interface IBaseMarkerOptions {
    draggable: boolean;
    visible: boolean;
    clickable: boolean;
    icon: IIcon;
    title: string;
}