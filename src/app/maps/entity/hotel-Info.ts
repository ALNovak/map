import { IHotelInfo } from "../interfaces/i-hotel-info";

export class HotelInfo implements IHotelInfo {
	HotelID: number;
	CountryISO: string;
	LangID: number;
	Name: string;
	Country: string;
	City: string;
	Region: string;
	Address: string;
	latitude: number;
	longitude: number;
	ZIP: number;
	Rank: number;
	Locations: string;
}
