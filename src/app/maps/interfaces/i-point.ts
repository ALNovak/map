import { IAddress } from "./i-address";
import { IPrice } from "./i-price";
import { IPosition } from "./i-position";
import { IIcon } from "./i-icon";
import { IAdditionalInformation } from "./i-additional-Information";

export interface IPoint {
    title: string;
    name: string;
    photos: Array<IIcon>;
    address: IAddress;
    additionalInformation: IAdditionalInformation;
    position: IPosition;
    price: IPrice;
    cancellationPolicy: string;
    extras: string;
    tmcAgencyMargin: string;
    id: string;
    googlePlaceId: string;
    type: string;
    source: string;
    subtype: string;
}
