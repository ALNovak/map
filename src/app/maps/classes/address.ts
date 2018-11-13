import { IAddress } from "../interfaces/i-address";

export class Address implements IAddress {
    country: string;
    city: string;
    house: string;
    postCode: string;
    countryCode: string;
    district: string;
    street: string;
    description: string;
}