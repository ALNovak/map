import { AbstractSearch } from "../../abstract/abstract-search";
import { Injectable } from "@angular/core";
import { IPoint } from "../../interfaces/i-point";
import { ResponseStatus } from "./enum/e-status-response ";
import { Point } from "../../entity/point";
import { Position } from "../../entity/position";
import { Address } from "../../classes/address";
import { Observable, Observer } from "rxjs";
import { AdditionalInformation } from "../../entity/point-additional-information";
import { PointAddressType } from "./enum/e-point-address-type";
import { GoogleAddressType } from "./classes/google-address-type";
import { PointAddress } from "./classes/point-address";
import { AddressComponent } from "./classes/address-component";
import { AddressSettings } from "./classes/address-settings";
import { AddressTypeName } from "./enum/e-address-type-name";
import { AddressType } from "./enum/e-adress-type";
import { CallbackName } from "../../enum/e-callback-name";
import { LanguageService } from "../../enum/e-language-service";
import { MapType } from "../../enum/e-map-type";
import { PointType } from "../../enum/e-point-type";

declare var google;

@Injectable()
export class GoogleSearchMap extends AbstractSearch {
 /**
  * Search on the map
  * @param {string} query
  * @returns {Array<IPoint>}
  * @memberof GoogleSearchMap
  */
 search(query: string): Array<IPoint> {
		let result = [];
		let service = new google.maps.places.AutocompleteService();
		let request = {
			input: query,
			language: LanguageService.en
		};

		service.getPlacePredictions(request, (response, status) => {
			if (status == ResponseStatus.OK) {
				for (var i = 0; i < response.length; i++) {
					let point: Point = new Point();
					let place = response[i];
					point.id = place.place_id;
					point.name = place.description;
					point.googlePlaceId = place.place_id;
					point.subtype = place.types[0];
					point.title = place.formatted_address;
					point.type = PointType.internet;
					point.source = MapType.GOOGLE;
					result.push(point)
				}
			}
			this.map.callbackMap.emit(CallbackName.responseMapError, status);
		}

		);
		this.map.callbackMap.emit(CallbackName.searchResult, result);
		return result;
	}

	/**
	 *  Get detailed information about a point
	 * @param {string} placeId - place id  google maps
	 * @returns {Observable<IPoint>}
	 * @memberof GoogleSearchMap
	 */
	searchDetails(placeId: string): Observable<IPoint> {
		return new Observable((observer: Observer<IPoint>) => {
			let placesService = new google.maps.places.PlacesService(this.map.api);

			placesService.getDetails({ placeId: placeId },
				(response, status) => {
					if (status == ResponseStatus.OK) {

						if (response) {
							let point: Point = new Point();
							point.position = new Position();
							point.address = new Address();
							point.additionalInformation = new AdditionalInformation();

							let place = response;
							let typeAddres = this.getDetailedAddress(place.address_components);

							for (let i = 0; i < typeAddres.length; i++) {
								let item = typeAddres[i];
								switch (item.type) {
									case PointAddressType.COUNTRY:
										point.address.country = item.value;
										break;
									case PointAddressType.CITY:
										point.address.city = item.value;
										break;
									case PointAddressType.DISTRICT:
										point.address.district = item.value;
										break;
									case PointAddressType.STREET:
										point.address.street = item.value;
										break;
									case PointAddressType.HOUSE:
										point.address.house = item.value;
										break;
									case PointAddressType.POSTCODE:
										point.address.postCode = item.value;
										break;
								}
							}
							point.address.countryCode = point.address.country.substring(0, 2).toUpperCase();
							point.position.latitude = place.geometry.location.lat();
							point.position.longitude = place.geometry.location.lng();

							if (this.map.api.config.placeHasPhoto(place)) {
								point.photos = place.photos[0].getUrl({ 'maxWidth': 340, 'maxHeight': 340 });
							}

							point.address.description = place.formatted_address;
							point.name = place.name;
							point.additionalInformation.rating = place.rating;
							point.additionalInformation.webSite = place.website;
							point.additionalInformation.phone = place.international_phone_number;
							point.googlePlaceId = place.place_id;
							point.id = place.id;
							point.subtype = place.types[0];
							point.type = PointType.internet;
							point.source = MapType.GOOGLE;
							this.map.callbackMap.emit(CallbackName.searchDetailsResult, point);
							observer.next(point);
						}

						this.map.callbackMap.emit(CallbackName.responseMapError, status);
					}
				});
		});
	}

	private getDetailedAddress(place: Array<GoogleAddressType>): Array<PointAddress> {

		let componentAddress = this.getAddressSettings();
		let pointAddress = [];
		let resultAddress = [];
		for (let i = 0; i < place.length; i++) {
			let parseAddress = new AddressComponent();
			let nameType = new PointAddress();
			let addressType = place[i].types[0];
			if (componentAddress[addressType]) {

				let addressValue = place[i][componentAddress[addressType]];
				nameType.type = addressType;
				nameType.value = addressValue;
				pointAddress.push(nameType);

				switch (addressType) {
					case AddressType.country:
						parseAddress.type = PointAddressType.COUNTRY;
						parseAddress.value = addressValue;
						resultAddress.push(parseAddress);
						break;
					case AddressType.locality:
						parseAddress.type = PointAddressType.CITY;
						parseAddress.value = addressValue;
						resultAddress.push(parseAddress);
						break;
					case AddressType.postalTown:
						parseAddress.type = PointAddressType.CITY;
						parseAddress.value = addressValue;
						resultAddress.push(parseAddress);
						break;
					case AddressType.streetNumber:
						parseAddress.type = PointAddressType.HOUSE;
						parseAddress.value = addressValue;
						resultAddress.push(parseAddress);
						break;
					case AddressType.administrativeAreaLevel1:
						parseAddress.type = PointAddressType.DISTRICT;
						parseAddress.value = addressValue;
						resultAddress.push(parseAddress);
						break;
					case AddressType.administrativeAreaLevel2:
						parseAddress.type = PointAddressType.DISTRICT;
						parseAddress.value = addressValue;
						resultAddress.push(parseAddress);
						break;
					case AddressType.route:
						parseAddress.type = PointAddressType.STREET;
						parseAddress.value = addressValue;
						resultAddress.push(parseAddress)
						break;
					case AddressType.postalCode:
						parseAddress.type = PointAddressType.POSTCODE;
						parseAddress.value = addressValue;
						resultAddress.push(parseAddress)
						break;
				}
			}
		}
		return resultAddress
	}

	private getAddressSettings(): AddressSettings {
		let AdressSettings = new AddressSettings();
		AdressSettings.country = AddressTypeName.longName;
		AdressSettings.route = AddressTypeName.longName;
		AdressSettings.locality = AddressTypeName.longName;
		AdressSettings.postal_town = AddressTypeName.longName;
		AdressSettings.administrative_area_level_1 = AddressTypeName.shortName;
		AdressSettings.sublocality_level_1 = AddressTypeName.longName;
		AdressSettings.street_number = AddressTypeName.shortName;
		AdressSettings.postal_code = AddressTypeName.shortName;
		return AdressSettings;
	}
}
