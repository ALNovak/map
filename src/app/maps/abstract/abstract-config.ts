import { IConfig } from '../interfaces/i-config';
import { AbstractMarkerCluster } from './abstract-marker-cluster';
import { BaseMarker } from '../entity/base-marker';
import { IPoint } from '../interfaces/i-point';
import { ShapeType } from '../enum/e-shape-type';
import { IPolygonOptions } from '../interfaces/i-polygon';
import { IRouteInfo } from '../interfaces/i-route-info';
import { IPosition } from '../interfaces/i-position';
import { AbstractMap } from './abstract-map';
import { TravelMode } from '../enum/e-travel-mode';
import { TrafficMode } from '../enum/e-traffic-mode';
import { GeoContainer } from '../entity/geo-container';
import { ICircleOptions } from '../interfaces/i-circle-options';
import { IPolylineOptions } from '../interfaces/i-polyline-options';
import { Injectable } from '@angular/core';
import { IInitMap } from '../interfaces/i-init-map';
import * as point from '../test.markers.json';
import { IEventClickMap } from '../providers/google/interfaces/i-event-clik-map';
import { IMapOptions } from '../interfaces/i-map-options';
import { Position } from '../entity/position';
import { Point } from '../entity/point';
import { ILatLngBounds } from '../providers/google/interfaces/i-latln-bounds';
import { ILatLng } from '../providers/google/interfaces/i-latlng';
import { MapToolbarComponent } from './../map-toolbar/map-toolbar.component';
import { BaseCicle } from '../entity/base-circle';
import { BasePolygon } from '../entity/base-polygon';
import { BasePolyline } from '../entity/base-polyline';
import { IRouteOptions } from '../interfaces/i-route-options';
import { IH21DateTime } from '../interfaces/i-h21-date-time';
import { TypeRoute } from '../enum/e-type-route';
import { HotelInfo } from '../entity/hotel-Info';


@Injectable()
export abstract class AbstractConfig implements IConfig, IInitMap {

    map: AbstractMap;
    geo: GeoContainer;
    toolbar: MapToolbarComponent;
    marker: BaseMarker;
    markerCluster: AbstractMarkerCluster;
    radiusShape: ShapeType;

    initMap(map: AbstractMap): void {

        this.map = map;
    }
/**
 * Builds route
 * @param from
 * @param to
 * @param typeRoute
 * @param [show]
 */
buildRoute(from: IPoint, to: IPoint, typeRoute: TypeRoute, show?: boolean): void {

        const IH21DateTime: IH21DateTime = {
            year: 2018,
            month: 10,
            day: 10,
            hour: 14,
            minute: 10,
            second: 10,
            time: '14',
            date: '19.10.2018',
        }

        let path;

        const polyLineOptions: IPolylineOptions = {
            geodesic: true,
            path: path,
            clickable: false,
            fillColor: '',
            fillOpacity: 0,
            strokeColor: '#007bff',
            strokeOpacity: 0.9,
            strokeWeight: 3,
        };

        const routeOptions: IRouteOptions = {
            travelMode: TravelMode.DRIVING,
            typeRoute: typeRoute,
            trafficModel: TrafficMode.PESSIMISTIC,
            departureTime: IH21DateTime,
            estimatedTimeArrival: IH21DateTime,
            polylineOptions: polyLineOptions,
            showOnMap: show,

        };
        this.map.route
            .setOptions(routeOptions)
            .setStartPoint(from)
            .setFinishPoint(to)
            .build();

    }

    clearAllMap(): void {

        this.map.geo.clearAllMap();
    }


    clearMarkers(): void {

        this.map.geo.clearMarkers();
    }

    clearRoutes(): void {
        this.map.geo.clearRoutes();
    }

    clearPolygons(): void {
        this.map.geo.clearPolygons();
    }

    clearCircle(): void {
        this.map.geo.clearCircle();
    }

    drawMarkersOnMap(): void {
        try {
            if (this.map.loadMarkers) {

                this.clearAllMap();

                let markersVisible = false;

                if (this.getZoom() <= 3) {

                    this.clearAllMap();
                }
                if (this.getZoom() > 5) {

                    markersVisible = true;
                }

                if (markersVisible) {
                    for (let i = 0; i < point.default.length; i++) {
                        const item = point.default[i];
						const marker = this.getBaseMarker(item);
                        marker.point = new Point();
                        marker.point.id = item.HotelID;
                        marker.point.position = new Position();
                        marker.point.position.latitude = item.latitude;
                        marker.point.position.longitude = item.longitude;
                        marker.point.title = item.Name;

                        this.boundsContainsMarker(marker);
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }

        if (this.map.geo.markers != null) {
            this.map.callbackMap.emit('countLoadMarkers', this.map.geo.markers.length);
        }

    }

    abstract getBounds(): ILatLngBounds;

    abstract getDetailsPoint(placeId: string): void;

    abstract drawCircle(cicle: BaseCicle): void;

    abstract drawPolyline(polyline: BasePolyline): void;

    abstract drawArea(polyline: BasePolyline, polygon: BasePolygon): void;

    abstract drawPolygon(polygon: BasePolygon): void;

    drawShapeOnMap(type: ShapeType, radius?: number, center?: IPosition): void {

        try {

            let path;

            if (radius == null) {
                radius = 10000;
            }

            if (center == null) {
                center = {
                    latitude: 0.0,
                    longitude: 0.0
                };
            }

            const circleOptions: ICircleOptions = {
                strokeColor: '#1E90FF',
                strokeOpacity: 0.9,
                strokeWeight: 3.5,
                fillColor: '#1E90FF',
                fillOpacity: 0.35,
                center: center,
                radius: radius,
                draggable: false,
                editable: false
            };

            const circle = new BaseCicle(circleOptions);

            const polygonOptions: IPolygonOptions = {
                path: path,
                strokeColor: '#1E90FF',
                strokeOpacity: 0.9,
                strokeWeight: 3.5,
                fillColor: '#1E90FF',
                fillOpacity: 0.35,
            };

            const polygon = new BasePolygon(polygonOptions);

            const polylineOptions: IPolylineOptions = {
                geodesic: false,
                path: path,
                clickable: false,
                strokeColor: '#1E90FF',
                strokeOpacity: 0.9,
                strokeWeight: 3.5,
                fillColor: '#1E90FF',
                fillOpacity: 0.35,
            };

            const polyline = new BasePolyline(polylineOptions);

            this.clearPolygons();

            switch (type) {
                case ShapeType.CIRCLE:
                    this.drawCircle(circle);
                    break;
                case ShapeType.AREA:
                    this.drawArea(polyline, polygon);
                    break;
                default:
                case ShapeType.STOP:
                    break;
            }
        } catch (error) {
            console.log(error);
        }

        this.map.loadMarkers = false;
    }

    abstract getAddress(position: IPosition): void;

    abstract getZoom(): number;

    abstract getLatLngBounds(): ILatLngBounds;

    abstract getCenter(): ILatLng;

    markersFitsBounds(): void {
        try {
            if (this.map.geo.markers != null && this.map.geo.markers.length > 0) {
                for (let i = 0; i < this.map.geo.markers.length; i++) {
                    this.boundsExtend(this.map.geo.markers[i].point.position, this.getLatLngBounds());
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    polygonsFitsBounds(): void {
        try {
            if (this.map.geo.polygons != null && this.map.geo.polygons.length > 0) {
                for (let i = 0; i < this.map.geo.polygons.length; i++) {

                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    abstract onClickMap(event: IEventClickMap);

    abstract boundsContainsMarker(marker: BaseMarker): boolean;

    polygonsContainsMarker(marker: BaseMarker, polygon: IPolygonOptions): boolean {

        const positionmarker = this.getPointPosition(marker);

        const markerLatitude = positionmarker.latitude;
        const markerLongitude = positionmarker.longitude;

        const polygonPointsLatitude = polygon.path.map(val => {
            return val.position.latitude;
        });

        const polygonPointsLongitude = polygon.path.map(val => {
            return val.position.longitude;
        });

        const polygonPointsCount = polygon.path.length;
        let contains = false;

        /*

        NOTE:
            i - current index of marker in array
            j - current index of polygon point in array

        */
        for (let i = 0, j = polygonPointsCount - 1; i < polygonPointsCount; j = i++) {
            if ((((polygonPointsLongitude[i] <= markerLongitude) && (markerLongitude < polygonPointsLongitude[j]))
                || ((polygonPointsLongitude[j] <= markerLongitude) && (markerLongitude < polygonPointsLongitude[i])))
                && (markerLatitude > (polygonPointsLatitude[j] - polygonPointsLatitude[i]) * (markerLongitude - polygonPointsLongitude[i])
                    / (polygonPointsLongitude[j] - polygonPointsLongitude[i]) + polygonPointsLatitude[i])) {
                contains = !contains;
            }
        }
        return contains;
    }

    radiusContainsMarker(marker: BaseMarker, position: IPosition): number {

        const circleCenterLatitude = position.latitude;
        const circleCenterLongitude = position.longitude;

        const positionmarker = this.getPointPosition(marker);

        const pointLatitude = positionmarker.latitude;
        const pointLongitude = positionmarker.longitude;

        const radiansCircleCenterLatitude = circleCenterLatitude * (Math.PI / 180);
        const radiansCircleCenterLongitude = circleCenterLongitude * (Math.PI / 180);
        const radiansPointLatitude = pointLatitude * (Math.PI / 180);
        const radiansPointLongitude = pointLongitude * (Math.PI / 180);

        const EARTH_RADIUS = 6372.795;

        const radiansDifferenceOfLongitudes = radiansPointLongitude - radiansCircleCenterLongitude;

        const arcTanganceOfTop = Math.sqrt(Math.pow(Math.cos(radiansPointLatitude) * Math.sin(radiansDifferenceOfLongitudes), 2) + Math.pow(Math.cos(radiansCircleCenterLatitude) * Math.sin(radiansPointLatitude) - Math.sin(radiansCircleCenterLatitude) * Math.cos(radiansPointLatitude) * Math.cos(radiansDifferenceOfLongitudes), 2));
        const arcTanganceOfBottom = Math.sin(circleCenterLatitude) * Math.sin(pointLatitude) + Math.cos(circleCenterLatitude) * Math.cos(pointLatitude) * Math.cos(radiansDifferenceOfLongitudes);
        const angle = Math.atan2(arcTanganceOfTop, arcTanganceOfBottom);
        const length = EARTH_RADIUS * angle;

        return length;
    }

    abstract getRouteInfo(): IRouteInfo;

    getBaseMarker(point: IPoint): BaseMarker {

        return new BaseMarker({
            title: point.title,
            icon: {
                url: './assets/icons_map/icon_hotel.png',
                title: ''
            },
            clickable: true,
            draggable: false,
            visible: true,

        });
    }

    abstract addMarker(point: IPoint, onSelectedpoint?: boolean): void;

    abstract setZoom(zoom: number): void;

    abstract setMinZoom(zoom: number): void;

    abstract setMaxZoom(zoom: number): void;

    abstract setCenter(position: IPosition): void;

    toggleMapDragging(enabled: boolean) {

        if (enabled) {
            this.map.options.allowScrolling = false;
            this.map.options.enableZoomByDoubleClick = true;
            this.map.options.draggable = false;
        } else {
            this.map.options.allowScrolling = true;
            this.map.options.enableZoomByDoubleClick = false;
            this.map.options.draggable = true;
        }
    }

    getMapOptions(): IMapOptions {

        return this.map.options;

    }

    abstract toggleTrafficLayer(show: boolean): void;

    abstract toggleTransitLayer(show: boolean): void;

    abstract zoomIn(): void;

    abstract zoomOut(): void;

    abstract boundsExtend(position: IPosition, bounds: ILatLngBounds): void;

    abstract boundsExtendPolygon(polygon: BasePolygon, bounds: ILatLngBounds): void;

    abstract onEventIdle(): void;

    abstract setDraggableMarker(enabled: boolean): void;

    private getPointPosition(marker: BaseMarker): Position {
        return marker.point.position;
    }

}
