import { IMapOptions } from '../interfaces/i-map-options';
import { GeoContainer } from '../entity/geo-container';
import { AbstractConfig } from './abstract-config';
import { FetchStatus } from '../enum/e-fetch-status';
import { IApiSettings } from '../interfaces/i-api-settings';
import { Observable } from 'rxjs';
import { AbstractEvent } from './abstract-event';
import { Injectable } from '@angular/core';
import { AbstractMarkerCluster } from './abstract-marker-cluster';
import { AbstractSearch } from './abstract-search';
import { AbstractRouteBuilder } from './abstract-route-builder';
import { BaseMarker } from '../entity/base-marker';
import { BaseLayer } from '../entity/base-layer';
import { EventEmitter } from 'events';

@Injectable()
export abstract class AbstractMap {
    /**
     * Map-specific API object;
     */
	api: any;
    /**
     * allow to load markers dynamically;
     */
	loadMarkers: boolean = true;
	/**
	 * enable/disable the click event on the map
	 * @type {boolean}
	 * @memberof AbstractMap
	 */
	clickMap: boolean = false;
	/**
	 * The object selected marker
	 * @type {BaseMarker}
	 * @memberof AbstractMap
	 */
	selectedMarker: BaseMarker;
	/**
	 * Transport layer on the map
	 * @type {BaseLayer}
	 * @memberof AbstractMap
	 */
	transitLayer: BaseLayer;
	/**
	 * Traffic layer on the map
	 * @type {BaseLayer}
	 * @memberof AbstractMap
	 */
	trafficLayer: BaseLayer;
	/**
	 * List of subscriptions to map events
	 * @type {EventEmitter}
	 * @memberof AbstractMap
	 */
	callbackMap: EventEmitter = new EventEmitter();
	/**
	 * Gets container
	 * @readonly
	 * @type {HTMLElement}
	 * @memberof AbstractMap
	 */
	public get container(): HTMLElement {
		return document.getElementById('map');
	};
	/**
	 * Gets style selector
	 * @readonly
	 * @abstract
	 * @type {string}
	 * @memberof AbstractMap
	 */
	public abstract get styleSelector(): string;
	/**
	 *  Gets script selector
	 * @readonly
	 * @abstract
	 * @type {string}
	 * @memberof AbstractMap
	 */
	public abstract get scriptSelector(): string;

	constructor(public options: IMapOptions,
		public config: AbstractConfig,
		public events: AbstractEvent,
		public cluster: AbstractMarkerCluster,
		public geo: GeoContainer,
		public search: AbstractSearch,
		public route: AbstractRouteBuilder) {

		this.events.initMap(this);
		this.cluster.initMap(this);
		this.config.initMap(this);
		this.search.initMap(this);
		this.route.initMap(this);
	}

    /**
     * It is necessary in the api object to initialize an instance of the api of a specific map.
     */
	public abstract init(): void;

    /**
     *
     * @abstract
     * @param {IApiSettings} settings
     * @returns {Observable<FetchStatus>}
     * @memberof AbstractMap
     */
	public abstract onDataFetched(settings: IApiSettings): Observable<FetchStatus>;

	public destroy(): void {
		this.removeCurrentMapScriptContainer();
		this.clearCurrentMapStyles();
		this.clearCurrentMapScripts();
		this.container.innerHTML = "";
	}

	private removeCurrentMapScriptContainer(): void {
		let apiScript = document.getElementById('mapAPI');
		if (apiScript) {
			apiScript.remove();
		}
	}

	private clearCurrentMapStyles(): void {
		Array.from(document.querySelectorAll('style'))
			.forEach(style => {
				let isMapStyle = style.innerHTML.indexOf(this.styleSelector) > -1;
				if (isMapStyle) {
					style.remove();
				}
			});
	}

	private clearCurrentMapScripts(): void {
		Array.from(document.querySelectorAll(this.scriptSelector))
			.forEach(script => {
				script.remove();
			});
	}
}
