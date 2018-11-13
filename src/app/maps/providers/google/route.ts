import { AbstractRouteBuilder } from "../../abstract/abstract-route-builder";
import { RouteInfo } from "../../classes/route-info";
import { RouteTextValue } from "../../classes/route-text-value";
import { Observable, Observer } from "rxjs";
import { TypeRoute } from "../../enum/e-type-route";
import { ResponseStatus } from "../baidu/enum/e-status-response ";

declare var google;

export class GoogleRouteBuilder extends AbstractRouteBuilder {

    showStartPoint(): void {

        this.map.config.addMarker(this.startPoint, false);
    }

    showFinishPoint(): void {

        this.map.config.addMarker(this.finishPoint, false);

    }

    build(): void {

        try {

            this.map.config.clearAllMap();
            this.showStartPoint();
            this.showFinishPoint();

            if (this.routeOptions.showOnMap) {
                switch (this.routeOptions.typeRoute) {
                    case TypeRoute.CAR:
                        this.showRouteCar();
                        break;
                    case TypeRoute.FLY:
                        this.showRouteFly();
                }
            }
        }
        catch (error) {
        }
    }

	 /**
     * Method route information.
     */

    getInfoRoute(): Observable<any> {
        try {
            return new Observable((observer: Observer<any>) => {
                let directionsService = new google.maps.DirectionsService();

                let start = new google.maps.LatLng(this.map.route.startPoint.position.latitude, this.map.route.startPoint.position.longitude);
                let end = new google.maps.LatLng(this.map.route.finishPoint.position.latitude, this.map.route.finishPoint.position.longitude);

                let request = {
                    origin: start,
                    destination: end,
                    travelMode: this.routeOptions.travelMode,
                    drivingOptions: {
                        departureTime: new Date(Date.now() + 3000),
                        trafficModel: this.routeOptions.trafficModel
                    }
                };

                directionsService.route(request, (response, status) => {

                    if (status == ResponseStatus.OK) {
                        let info = response['routes'][0].legs[0];
                        let typeMode = response.request.travelMode;
                        let routeInfo = new RouteInfo();

                        routeInfo.distance = new RouteTextValue();
                        routeInfo.distance.text = info.distance.text;
                        routeInfo.distance.value = info.distance.value;

                        routeInfo.time = new RouteTextValue();
                        routeInfo.time.text = info.duration.text;
                        routeInfo.time.value = info.duration.value;
                        routeInfo.timeTraffic = new RouteTextValue();

                        routeInfo.timeTraffic.text = info.duration_in_traffic.text;
                        routeInfo.timeTraffic.value = info.duration_in_traffic.value;
                        routeInfo.staticMapUrl = '';
                        routeInfo.type = typeMode;
                        this.map.route.routeInfo = routeInfo;

                        this.map.callbackMap.emit('infoRoute', routeInfo);

                        observer.next(response);

                    } else {
                        this.map.callbackMap.emit('errorMap', status);
                    }
                });
            });
        }
        catch (error) {
            console.log(error)
        }
    }

     /**
     * Method route distance information.
     */
    getInfoDistance(): RouteInfo {

        return this.map.route.routeInfo;
    }

    /**
     * Method show route fly.
     */
    private showRouteFly(): void {

        this.routeOptions.polylineOptions.path = [new google.maps.LatLng(this.map.route.startPoint.position.latitude, this.map.route.startPoint.position.longitude),
        new google.maps.LatLng(this.map.route.finishPoint.position.latitude, this.map.route.finishPoint.position.longitude)];

        let directionsDisplay = new google.maps.Polyline(this.routeOptions.polylineOptions);

        directionsDisplay.setMap(this.map.api);

        this.map.geo.pushRoutes(directionsDisplay);
    }

     /**
     * Method show route car.
     */
    private showRouteCar(): void {

        let directionsDisplay = new google.maps.DirectionsRenderer();

        directionsDisplay.setMap(this.map.api);
        this.map.geo.pushRoutes(directionsDisplay);

        this.routeOptions.polylineOptions.strokeWeight = 4;

        directionsDisplay.setOptions({
            polylineOptions: this.routeOptions.polylineOptions,
            suppressMarkers: true
        });

        this.getInfoRoute().subscribe(response => {
            directionsDisplay.setDirections(response);

        });
    }

}