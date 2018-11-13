import { AbstractConfig } from '../../abstract/abstract-config';
import { BaseMarker } from '../../entity/base-marker';
import { IPolygonOptions } from '../../interfaces/i-polygon';
import { IRouteInfo } from '../../interfaces/i-route-info';
import { IPoint } from '../../interfaces/i-point';
import { GoogleMarkerOptions } from './entity/google-marker-options';
import { Injectable } from '@angular/core';
import { IEventClickMap } from './interfaces/i-event-clik-map';
import { ILatLng } from '../../providers/google/interfaces/i-latlng';
import { ResponseStatus } from './enum/e-status-response ';
import { Position } from '../../entity/position';
import { ILatLngBounds } from './interfaces/i-latln-bounds';
import { Point } from '../../entity/point';
import { EventType } from '../../enum/e-event-type';
import { OptionType } from '../../enum/e-option';
import { Address } from '../../classes/address';
import { AddressType } from './enum/e-adress-type';
import { AddressTypeName } from './enum/e-address-type-name';
import { AddressSettings } from "./classes/address-settings";
import { PointAddress } from './classes/point-address';
import { AddressComponent } from './classes/address-component';
import { PointAddressType } from './enum/e-point-address-type'
import { GoogleAddressType } from './classes/google-address-type';
import { BaseCicle } from '../../entity/base-circle';
import { BasePolyline } from '../../entity/base-polyline';
import { BasePolygon } from '../../entity/base-polygon';
import { AdditionalInformation } from '../../entity/point-additional-information';
import { TypeRoute } from '../../enum/e-type-route';
import { IPosition } from '../../interfaces/i-position';
import { BoundsMap } from './classes/bounds-map';
import { CallbackCicleInfo } from '../../classes/callback-cicle-radius';
import { CallbackName } from '../../enum/e-callback-name';
import { CallbackMarkerInfo } from '../../classes/callback-marker';

declare var google;

@Injectable()

export class GoogleConfig extends AbstractConfig {

	/**
	 *	To get route information
	 * @returns {IRouteInfo}
	 * @memberof GoogleConfig
	 */
	getRouteInfo(): IRouteInfo {
		return this.map.route.routeInfo;
	}
	/**
	 * Scale the map so that all markers on the map are visible
	 * @memberof GoogleConfig
	 */
	markersFitsBounds(): void {
		super.markersFitsBounds();
	}
	/**
	 * Entry into borders
	 * @param {IPosition} position
	 * @param {ILatLngBounds} bounds
	 * @memberof GoogleConfig
	 */
	boundsExtend(position: IPosition, bounds: ILatLngBounds): void {
		bounds.extend(this.generateCoordinates(position));
		this.map.api.fitBounds(bounds);
		this.map.api.panToBounds(bounds);
	}
	/**
	 *
	 *
	 * @param {BasePolygon} polygon
	 * @param {ILatLngBounds} bounds
	 * @memberof GoogleConfig
	 */
	boundsExtendPolygon(polygon: BasePolygon, bounds: ILatLngBounds): void {
		this.map.api.fitBounds(bounds);
	}

	getLatLngBounds(): ILatLngBounds {
		return new google.maps.LatLngBounds();
	};

	/**
	 * Bounds contains marker
	 * @param marker
	 * @returns true if contains marker
	 */
	boundsContainsMarker(marker: BaseMarker): boolean {
		let googleMarkerOptions: GoogleMarkerOptions = {
			draggable: marker.options.draggable,
			clickable: marker.options.clickable,
			visible: marker.options.visible,
			title: marker.point.title,
			position: this.generateCoordinates(marker.point.position),
			icon: {
				title: 'hotel',
				url: './assets/icons_map/icon_hotel.png'
			},
			zIndex: 10
		};

		let googleMarker = new google.maps.Marker(googleMarkerOptions);
		googleMarker["point"] = marker.point;
		google.maps.event.addListener(googleMarker, EventType.click, () => {
			this.setSelectedMarker(googleMarker);
			this.map.callbackMap.emit(CallbackName.markerClick, googleMarker.point.id);
		});

		if (this.getBounds().contains(googleMarker.getPosition())) {
			this.map.geo.pushMarkers(googleMarker);
			this.map.cluster.addMarker(googleMarker, false);
		}
		return true;
	}

	/**
	 * Build a route between the start and end point
	 * @param {IPoint} from - starting point of the route;
	 * @param {IPoint} to - end point of the route;
	 * @param {TypeRoute} typeRoute - route type (CAR, FLY);
	 * @param {boolean} show - show route on the map;
	 * @memberof GoogleConfig
	 */
	buildRoute(from: IPoint, to: IPoint, typeRoute: TypeRoute, show: boolean): void {
		super.buildRoute(from, to, typeRoute, show);
	}
	/**
	 * Clear all objects from the map
	 * @memberof GoogleConfig
	 */
	clearAllMap(): void {
		this.clearPolygons();
		this.clearMarkers();
		this.clearCircle();
		this.clearRoutes();
		super.clearAllMap();
		this.map.selectedMarker = null;
	}
	/**
	 * Clear markers the map
	 * @memberof GoogleConfig
	 */
	clearMarkers(): void {
		if (this.map.cluster.googleCluster != null) {
			this.map.cluster.removeMarkers();
		}
		super.clearMarkers();
	}

	/**
	 *  Clear route the map
	 * @memberof GoogleConfig
	 */
	clearRoutes(): void {
		if (this.map.geo.routes != undefined && this.map.geo.routes[0] != null) {
			this.map.geo.routes.forEach((item) => {
				item.setMap(null);
			});
			super.clearRoutes();
		}
	}
	/**
	 * Clear polygons the map
	 * @memberof GoogleConfig
	 */
	clearPolygons(): void {
		if (this.map.geo.polygons != undefined && this.map.geo.polygons[0] != null) {
			this.map.geo.polygons.forEach((item) => {
				item.setMap(null);
			});
			super.clearPolygons();
		}
	}
	/**
	 * Clear cicle the map
	 * @memberof GoogleConfig
	 */
	clearCircle(): void {
		if (this.map.geo.circle != null) {
			this.map.geo.circle.setMap(null);
			super.clearCircle();
		}
	}
	/**
	 * Triggered when there is a click event on the map
	 * @param {IEventClickMap} event
	 * @memberof GoogleConfig
	 */
	onClickMap(event: IEventClickMap) {
		try {
			event.stop();
			if (this.map.clickMap) {
				this.map.loadMarkers = !this.map.clickMap;
				if (event.placeId) {
					this.map.callbackMap.emit(CallbackName.onclickMapPlaceId, event.placeId);
				}
				else {
					let position = <Position>{
						latitude: event.latLng.lat(),
						longitude: event.latLng.lng()
					}
					this.map.callbackMap.emit(CallbackName.onclickMapCoordinates, position);
				}
			}
		} catch (error) { }
	}
	/**
	 * Increase the current zoom on one position, increases scale by 1
	 * @memberof GoogleConfig
	 */
	zoomIn(): void {
		try {
			let currentZoom = this.getZoom();
			this.setZoom(currentZoom + 1);
		}
		catch (error) { }
	}
	/**
	 * Decrease the current zoom on one position, zooms out by 1
	 * @memberof GoogleConfig
	 */
	zoomOut(): void {
		try {
			let currentZoom = this.getZoom();
			this.setZoom(currentZoom - 1);
		}
		catch (error) { }
	}
	/**
	 * Get the number of loaded points on the map
	 * @returns {number}
	 * @memberof GoogleConfig
	 */
	getLoadCountMarker(): number {
		try {
			return this.map.geo.markers.length;
		}
		catch (error) { }
	}
	/**
	 * Get point information based on coordinates
	 * @param {IPosition} position
	 * @memberof GoogleConfig
	 */
	getAddress(position: IPosition): void {
		try {
			let geocoder = new google.maps.Geocoder();
			let point: Point = new Point();
			point.position = new Position();
			point.address = new Address();

			geocoder.geocode({ 'latLng': this.generateCoordinates(position) },
				(response, status) => {
					if (status == ResponseStatus.OK) {
						var place = response[0];
						let typeAddress = this.getDetailedAddress(place.address_components);

						for (let i = 0; i < typeAddress.length; i++) {
							let item = typeAddress[i];

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
						point.address.description = place.formatted_address;
						point.position.latitude = place.geometry.location.lat();
						point.position.longitude = place.geometry.location.lng();
						point.name = place.formatted_address;
						point.googlePlaceId = place.place_id;
						point.id = place.place_id;
						point.subtype = place.types[0];
						point.title = place.formatted_address;
						point.type = 'internet'
						point.source = 'google';
						this.map.callbackMap.emit(CallbackName.geocoderAddressResult, point);
					}

					this.map.callbackMap.emit(CallbackName.responseMapError, status);
				});

		}
		catch (error) { }
	}
	/**
	 * Get detailed information about the point
	 * @param {string} placeId - id place google maps
	 * @memberof GoogleConfig
	 */
	getDetailsPoint(placeId: string): void {
		try {
			let placesService = new google.maps.places.PlacesService(this.map.api);
			placesService.getDetails({ placeId: placeId },
				(response, status) => {
					if (status == ResponseStatus.OK) {
						if (response) {
							let point: Point = new Point();
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

							point.address.description = place.formatted_address;
							point.address.countryCode = point.address.country.substring(0, 2).toUpperCase();
							point.position = {
								latitude: place.geometry.location.lat(),
								longitude: place.geometry.location.lng()
							}
							if (this.placeHasPhoto(place)) {
								point.photos = place.photos[0].getUrl({ 'maxWidth': 340, 'maxHeight': 340 });
							}
							point.additionalInformation = {
								webSite: place.website,
								rating: place.rating,
								phone: place.international_phone_number
							};
							point.name = place.name;
							point.googlePlaceId = place.place_id;
							point.id = place.id;
							point.subtype = place.types[0];
							point.type = 'internet'
							point.source = 'google';
							this.map.callbackMap.emit(CallbackName.detailsAddressResultPoint, point);
						}
					}

					this.map.callbackMap.emit(CallbackName.responseMapError, status);
				});
		} catch (error) { }
	}
	/**
	 * Get current map zoom
	 * @returns {number} zoom [the current scale]
	 * @memberof GoogleConfig
	 */
	getZoom(): number {
		try {
			return this.map.api.getZoom();
		} catch (error) { }
	}
	/**
	 * Get the boundaries of the visible map area
	 * @returns {ILatLngBounds} ILatLngBounds [geographic coordinates visible part of the map]
	 * @memberof GoogleConfig
	 */
	getBounds(): ILatLngBounds {
		try {
			return this.map.api.getBounds();
		} catch (error) { }
	}
	/**
	 * To the center of the map
	 * @returns {ILatLng} center [geographic coordinates center point of the map.]
	 * @memberof GoogleConfig
	 */
	getCenter(): ILatLng {
		try {
			return this.map.api.getCenter();
		} catch (error) { }
	}
	/**
	 * To the center of the map
	 * @param {number} zoom - zoom in on the map
	 * @memberof GoogleConfig
	 */
	setZoom(zoom: number): void {
		try {
			this.map.api.setZoom(zoom);
		} catch (error) { }
	}
	/**
	 * Set minimum zoom map
	 * @param {number} zoom
	 * @memberof GoogleConfig
	 * @example 4
	 */
	setMinZoom(zoom: number): void {
		try {
			this.map.api.setOptions({ minZoom: zoom });
		} catch (error) { }
	}
	/**
	 * Set max zoom map
	 * @param {number} zoom
	 * @memberof GoogleConfig
	 * @example 4
	 */
	setMaxZoom(zoom: number): void {
		try {
			this.map.api.setOptions({ maxZoom: zoom });
		} catch (error) {
		}
	}
	/**
	 * To set the center of the map
	 * @param {IPosition} position sets the center of the map. Coordinates center set by IPosition
	 * @memberof GoogleConfig
	 * @example  position {latitude: 19.84114, longitude: 46.488808}
	 */
	setCenter(position: IPosition): void {
		try {
			this.map.api.setCenter(this.generateCoordinates(position));
		} catch (error) {
			console.log(error);
		}
	}
	/**
	 * Toggles map dragging
	 * @param {boolean} enabled - Changes the value of the flag: true = enable moving map;
	 *  false = disable moving map
	 * @memberof GoogleConfig
	 */
	toggleMapDragging(enabled: boolean) {
		try {
			let currentMapOptions = super.getMapOptions();
			if (enabled) {
				this.map.api.setOptions({
					draggable: currentMapOptions.draggable = false,
					scrollwheel: currentMapOptions.scrollwheel = false,
					disableDoubleClickZoom: currentMapOptions.disableDoubleClickZoom = false,
				});
			}
			else {
				this.map.api.setOptions({
					draggable: currentMapOptions.draggable = true,
					scrollwheel: currentMapOptions.scrollwheel = true,
					disableDoubleClickZoom: currentMapOptions.disableDoubleClickZoom = true,
				});
			}
		} catch (error) {
			console.log(error);
		}
	}

	/**
	  Add marker to map
	 * @param {IPoint} point
	 * @param {boolean} onSelectedPoint
	 * @memberof GoogleConfig
	 */
	addMarker(point: IPoint, onSelectedPoint: boolean):void {
		try {
			let googleMarkerOptions: GoogleMarkerOptions = {
				draggable: false,
				clickable: true,
				visible: true,
				title: point.name,
				position: this.generateCoordinates(point.position),
				icon: {
					title: point.name,
					url: './assets/icons_map/icon_flag.png'
				},
				zIndex: 1,

			};

			let marker = new google.maps.Marker(googleMarkerOptions);
			google.maps.event.addListener(marker, EventType.click, () => {
				let position = this.getPosition(this.map.selectedMarker);
				this.map.callbackMap.emit(CallbackName.markerClick, position);
			});

			if (onSelectedPoint) {
				this.map.selectedMarker = marker;
			}

			marker["point"] = point;

			if (this.map.cluster.googleCluster != null) {
				this.map.geo.pushMarkers(marker)
				this.map.cluster.addMarker(marker, true);
				this.map.cluster.refreshMarkers();
			}

			this.markersFitsBounds();

		} catch (error) {
			console.log(error);
		}
	}


	drawMarkersOnMap(): void {
		super.drawMarkersOnMap();
	}

	/**
	 * To set a dragged marker on the map.
	 * @param {boolean} enabled
	 * @memberof GoogleConfig
	 */
	setDraggableMarker(enabled: boolean): void {
		try {
			this.map.loadMarkers = !enabled;
			if (this.map.selectedMarker != null) {
				this.map.callbackMap.emit(CallbackName.markerDraggable, this.getMarkerInfo(this.map.selectedMarker));
				this.map.selectedMarker.setDraggable(enabled);
				console.log(this.map.selectedMarker, 'selectMarker')
			}

			google.maps.event.addListener(this.map.selectedMarker, EventType.dragEnd, () => {
				let position = this.getPosition(this.map.selectedMarker);
				this.map.callbackMap.emit(CallbackName.markerDraggableEnd, this.getMarkerInfo(this.map.selectedMarker));
			});

		} catch (error) {

		}
	}
	/**
	* To set the circle on the map
	 * @param {BaseCicle} cicle
	 * @memberof GoogleConfig
	 */
	drawCircle(cicle: BaseCicle): void {
		try {
			if (this.map.geo.circle != null) {
				this.clearCircle();
			}
			cicle.options.center = new google.maps.LatLng(
				{
					lat: cicle.options.center.latitude,
					lng: cicle.options.center.longitude
				}
			);
			let circle = new google.maps.Circle(cicle.options);

			circle.setMap(this.map.api);

			let infoCicle = this.getCicleInfo(circle);
			this.map.callbackMap.emit(CallbackName.createRadius, infoCicle);

			this.map.geo.circle = circle;

			google.maps.event.addListener(circle, EventType.radiusChanged, () => {
				let infoCicle = this.getCicleInfo(circle);
				this.map.callbackMap.emit(CallbackName.radiusChanged, infoCicle);
			});

			google.maps.event.addListener(circle, EventType.dragEnd, () => {
				let infoCicle = this.getCicleInfo(circle);
				this.map.callbackMap.emit(CallbackName.radiusDragEnd, infoCicle);

				this.setCircleDraggable(false)
			});
		} catch (error) {

		}
	}

	/**
	 * To set an editable circle
	 * @param {boolean} enabled
	 * @memberof GoogleConfig
	 */
	setCircleEditable(enabled: boolean): void {
		this.map.geo.circle.setEditable(enabled);
	}
	/**
	 * To set the radius of the circle
	 * @param {number} radius
	 * @memberof GoogleConfig
	 */
	setCircleRadius(radius: number): void {
		this.map.geo.circle.setRadius(radius);
	}

	/**
	 * To set the radius of the circle
	 * @param {boolean} enabled
	 * @memberof GoogleConfig
	 */
	setCircleDraggable(enabled: boolean): void {
		this.map.geo.circle.setDraggable(enabled);
	}

	/**
	 * Install bind circle to marker
	 * @memberof GoogleConfig
	 */
	setBindCicleToMarker(): void {
		if (this.map.geo.circle != null) {
			this.map.geo.circle.bindTo(OptionType.center, this.map.selectedMarker, OptionType.position);
		}
	}
	/**
	 * Set the markers load
	 * @param {boolean} enabled
	 * @memberof GoogleConfig
	 */
	setLoadMarkers(enabled: boolean): void {
		this.map.loadMarkers = enabled;
	}

	/**
	 * Set the click map
	 * @param {boolean} enabled -
	 * @memberof GoogleConfig
	 */
	setClikMap(enabled: boolean): void {
		this.map.clickMap = enabled;
	}

	/**
	 * Draw polygon on the map
	 * @param {BasePolygon} polyline
	 * @memberof GoogleConfig
	 */
	drawPolygon(polyline: BasePolygon): void {
		polyline = new google.maps.Polyline(polyline.options);
		polyline.setMap(this.map.api);
	}
	/**
	 * Draw polyline on the map
	 * @param {BasePolyline} polyline
	 * @memberof GoogleConfig
	 */
	drawPolyline(polyline: BasePolyline): void {
		polyline = new google.maps.Polyline(polyline.options);
		polyline.setMap(this.map.api);
	}

	/**
	 * draw an arbitrary area on the map
	 * @param {BasePolyline} polyline
	 * @param {BasePolygon} polygon
	 * @memberof GoogleConfig
	 */
	drawArea(polyline: BasePolyline, polygon: BasePolygon): void {
		try {
			let drawShaping: any;
			this.toggleMapDragging(true);
			google.maps.event.addDomListener(this.map.api.getDiv(), EventType.mouseDown, () => {
				drawShaping = new google.maps.Polyline(polyline.options);

				drawShaping.setMap(this.map.api);
				this.map.geo.pushPolygons(drawShaping);

				let move = google.maps.event.addListener(this.map.api, EventType.mouseMove, event => {
					drawShaping.getPath().push(event.latLng);

					let convertCoordinates = this.getConvertArrayPolygons(drawShaping.getPath().getArray());
					this.map.callbackMap.emit(CallbackName.drawAreasDragMove, convertCoordinates);

				});

				google.maps.event.addListenerOnce(this.map.api, EventType.mouseUp, () => {
					google.maps.event.removeListener(move);
					let path = drawShaping.getPath();
					drawShaping.setMap(null);
					polygon.options.path = path;
					drawShaping = new google.maps.Polygon(polygon.options);
					drawShaping.setMap(this.map.api);
					this.toggleMapDragging(false);
					this.map.geo.pushPolygons(drawShaping)

					google.maps.event.clearListeners(this.map.api.getDiv(), EventType.mouseDown);
					let convertCoordinates = this.getConvertArrayPolygons(drawShaping.getPath().getArray())
					this.map.callbackMap.emit(CallbackName.drawAreaDragEnd, convertCoordinates);
					this.fitBoundsArrayCoordinates(drawShaping.getPath().getArray());

				});
			});
		} catch (error) {

		}
	}
	/**
	 * Show the layer of traffic jams on the map
	 * @param {boolean} show
	 * @memberof GoogleConfig
	 */
	toggleTrafficLayer(show: boolean): void {
		try {
			if (this.map.trafficLayer == null) {
				this.map.trafficLayer = new google.maps.TrafficLayer();
			}

			this.map.trafficLayer.setMap(show ? this.map.api : null);
		} catch (error) {

		}
	}
	/**
	 * Show public transport layer on map
	 * @param {boolean} show
	 * @memberof GoogleConfig
	 */
	toggleTransitLayer(show: boolean): void {
		try {
			if (this.map.transitLayer == null) {
				this.map.transitLayer = new google.maps.TransitLayer();
			}
			this.map.transitLayer.setMap(show ? this.map.api : null);
		} catch (error) {

		}
	}

	polygonsContainsMarker(marker: BaseMarker, polygon: IPolygonOptions): boolean {
		return super.polygonsContainsMarker(marker, polygon);
	}

	/**
	 *  To change the size of the map
	 * @param {boolean} onCenter
	 * @memberof GoogleConfig
	 */
	resizeMap(onCenter: boolean) {
		try {
			if (onCenter) {
				google.maps.event.trigger(this.map.api, EventType.resize);
				this.setZoom(10);
				this.panTo(this.getCenter());
			}
			else {
				google.maps.event.trigger(this.map.api, EventType.resize);
				this.setZoom(this.getZoom());
			}

		} catch (error) {
		}
	}
	/**
	 * Determines whether event idle on
	 */
	onEventIdle() {
		this.changedBoundsMap();
	}
	/**
	 * Pans to
	 * @private
	 * @param {ILatLng} latLng sets the center of the map. If new the center is already visible on the map, it shifts smoothly
	 * @memberof GoogleConfig
	 */
	private panTo(latLng: ILatLng): void {
		this.map.api.panTo(latLng);
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
					case AddressType.administrativeAreaLevel2:
						parseAddress.type = PointAddressType.DISTRICT;
						parseAddress.value = addressValue;
						resultAddress.push(parseAddress);
						break;
					case AddressType.route:
						parseAddress.type = PointAddressType.STREET;
						parseAddress.value = addressValue;
						resultAddress.push(parseAddress);
						break;
					case AddressType.postalCode:
						parseAddress.type = PointAddressType.POSTCODE;
						parseAddress.value = addressValue;
						resultAddress.push(parseAddress);
						break;
				}
			}
		}
		return resultAddress
	}
	/**
	 * Set the selected marker
	 * @private
	 * @param {BaseMarker} marker
	 * @memberof GoogleConfig
	 */
	private setSelectedMarker(marker: BaseMarker): void {
		this.map.selectedMarker = marker;
	}
	/**
	 * Get selected marker
	 * @returns {BaseMarker}
	 * @memberof GoogleConfig
	 */
	getSelectedMarker(): BaseMarker {
		return this.map.selectedMarker;
	}
	/**
	 * generates coordinates for a specific provider (in this case google)
	 * @private
	 * @param {IPosition} position
	 * @returns
	 * @memberof GoogleConfig
	 */
	private generateCoordinates(position: IPosition) {
		return new google.maps.LatLng(position.latitude, position.longitude);
	}

	/**
	 * Obtaining information about the circle
	 * @private
	 * @param {*} circle
	 * @returns {CallbackCicleInfo}
	 * @memberof GoogleConfig
	 */
	private getCicleInfo(circle): CallbackCicleInfo {
		let position = new Position();
		position.latitude = circle.getCenter().lat();
		position.longitude = circle.getCenter().lng();
		let infoCicle = <CallbackCicleInfo>{
			radius: circle.getRadius(),
			position: position
		}
		return infoCicle;
	}
	/**
	 * getting marker information
	 * @private
	 * @param {*} marker
	 * @returns {CallbackMarkerInfo}
	 * @memberof GoogleConfig
	 */
	private getMarkerInfo(marker): CallbackMarkerInfo {
		let position = new Position();
		position.latitude = marker.getPosition().lat();
		position.longitude = marker.getPosition().lng();
		let infoMarker = <CallbackMarkerInfo>{
			position: position,
			id: marker.point.id,
		}
		return infoMarker;
	}
	/**
	 * Gets position
	 * @private
	 * @param {BaseMarker} marker
	 * @returns {IPosition}
	 * @memberof GoogleConfig
	 */
	private getPosition(marker: BaseMarker): IPosition {
		let position = new Position();
		position.latitude = marker.getPosition().lat();
		position.longitude = marker.getPosition().lng();
		return position;
	}
	/**
	 *  Gets convert array polygons
	 * @private
	 * @param {*} arrayCoordinates
	 * @returns {Array<Position>}
	 * @memberof GoogleConfig
	 */
	private getConvertArrayPolygons(arrayCoordinates): Array<Position> {
		let ArrayPosition = [];
		for (var i = 0; i < arrayCoordinates.length; i++) {
			var item = arrayCoordinates[i];
			let position = <Position>{
				latitude: item.lat(),
				longitude: item.lng(),
			}
			ArrayPosition.push(position);
		}
		return ArrayPosition;
	}
	/**
	 * Fits bounds array coordinates
	 * @private
	 * @param {*} arrayCoordinates
	 * @memberof GoogleConfig
	 */
	private fitBoundsArrayCoordinates(arrayCoordinates): void {
		let bounds = new google.maps.LatLngBounds();
		for (var n = 0; n < arrayCoordinates.length; n++) {
			bounds.extend(arrayCoordinates[n]);
		}
		this.map.api.panToBounds(bounds);
		this.map.api.fitBounds(bounds);

	}
	/**
	 * Places has photo
	 * @private
	 * @param {*} place
	 * @returns {boolean}
	 * @memberof GoogleConfig
	 */
	private placeHasPhoto(place): boolean {
		return place.photos !== undefined && "photos" in place && place.photos.length > 0
	}
	/**
	 * Changed bounds map
	 * @private
	 * @memberof GoogleConfig
	 */
	private changedBoundsMap(): void {
		let bounds = this.getBounds();
		if (bounds) {
			let SW = bounds.getSouthWest();
			let NE = bounds.getNorthEast();
			let currentBounds = new BoundsMap();
			currentBounds.ne = new Position();
			currentBounds.sw = new Position();
			currentBounds.ne.latitude = NE.lat();
			currentBounds.ne.longitude = NE.lng();
			currentBounds.sw.latitude = SW.lat();
			currentBounds.sw.longitude = NE.lng();
			this.map.callbackMap.emit(CallbackName.changedBoundsMap, currentBounds);
			this.drawMarkersOnMap();
		}
	}
	/**
	 * Gets address settings
	 * @private
	 * @returns {AddressSettings}
	 * @memberof GoogleConfig
	 */
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
