import { IPoint } from "../interfaces/i-point";
import { IIcon } from "../interfaces/i-icon";
import { IPosition } from "../interfaces/i-position";
import { IPrice } from "../interfaces/i-price";
import { IAddress } from "../interfaces/i-address";
import { IAdditionalInformation } from "../interfaces/i-additional-Information";

export class Point implements IPoint {
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
    subtype: string;
    source: string;
}
