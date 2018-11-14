import { AbstractMarkerCluster } from "../../abstract/abstract-marker-cluster";
import { BaseMarker } from "../../entity/base-marker";
import * as MarkerClusterer from '@google/markerclustererplus';
import { Injectable } from "@angular/core";
import { IPoint } from "../../interfaces/i-point";

@Injectable()
export class GoogleMarkerCluster extends AbstractMarkerCluster {

    googleCluster: MarkerClusterer;

    constructor() {

        super();
    }

    initMarkerCluster(): void {

        let mcOptions = {
            gridSize: 100,
            maxZoom: 19,
            zoomOnClick: true,
            ignoreHidden: false,
            styles: [
                {
                    textColor: 'black',
                    url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA4CAYAAACyutuQAAAEs0lEQVRoge2az4scRRTHP9VTOzO7cTO70UgW9RCQCIEgeFz1D9CLHvQukpugERE9+DcIgiii4CbRgyjkIP64CPEmqHjQjQkiBkVQF91Iktmdme4uD11vuqp6erazOzszLvOFR/+Ynu73rfejqvs9tbKywhCoku24YUq2BegB51zlI7sNZZwwAySlhFxISBSOHKkFx5MglDqSBMdyDeATEjJCQA8Q12rjgGuNeIAoMoJybYGQWGTOSgOoW9HkZMcJsUoMdK10rB49e01CQCgk09h8J34yPWaeMnVOYFDlYbhvUABqi6tz6+rC4Vf0J2REtqye2/Y6L76UzXJCpg40/vkgfjm93bw4ZgJDoa+o95ae0W8BbeCmlTYZyS42tmqLi4tiHQ3M/ftq/HBy3LzG+F1rKNI7OGWa/FT/NvpTTjEgQYjSksF0fK85TWataYPqPmgeAw4BC+Tx7WZhLylkVlLcOWZFK8PUaQFNMhdrkMW7xvEmd+LM4shMIPyrItNMsq6QEQspQAkzl9Skljc7w/TnSRF3sleQm2pSy5rdIKK4cikQgv8BGWU8HQfuF1OzmX5iDFn9D1pt7xrdkxuVrqtfOjrKx3qkpmryHAX2bKGqVin7z4itdfAsNCNUBfVLRz1XCo/3EwfOQiNN24IwUewmcewWB85CsxiadsxiaNoxi6FpxyyGph0HjtC+uBwU33PG5XYzC4Womo5nabs6vC+9UeGHSVSCbh2lReQoPMEUf3A0vmZu4RjZDy0UXjRVUKavo9SFCjq7FjJAqq6r78asZ2VEf/ELecE4wSfWt5Bb+0/mP4zWVJdfJ6LxEKg2Gwvv1j4lL0F2yYn1SUlJsl/Sn7usttMVLif3mFU0hyekvwfVZmPhbO31xsXoZ7K6qtRZ2+TkEpyicY1sTmoA88Ch7mp699bj6SPpEU6qFE2CIi2k+UjF9NIljiV3mQduRcnab+r7aJM/jKaGsiPsZtgIBZja7+rq/EfRV/qK+pus8t0Grlu5SVYV72CtFVbBpTdhnqyOKdLEL/+5X/8VULv2Rnw6PmEerUJmbl192Xpev0/quU5MXvx103Fqf+tZQlvkFhIyPZwqeNlzDXng9cgbHjr2xiIdoNP8PPqmu2pa6RHu24HMxdYL+jwJW45yrsj5bWffdbG287sMRn8QlNON5fb2aDKLuF0kGr9qBsWGjea1t+Pn4uPmiYFkflBftM7o84Gy4Sj3u0Lw+3zEimLVHn5SSAHKLOTeSNpSevitKeF+D4ibH0dfdx8yt6XLnPLIrKvPWmf0OWe0bzjijr7rBe62Ez6LoosOJeROYuJ2MkI9Zyvn+6NlSc2ny9wPoH9UF5ae1WvklpFOkBv4bhQOUNmzwvmnT0iVNACW9cgNKgWKC2oy92xik8rmWvwSKY3lp/Wb9trYKjwoFgqTZMk2FF/xHToaQ+XLjvudKGRZUjJl0+7La4oQCpPKQPcJyJQde6jyPlTlhinFVUdK5iLSCia9bWHshS60J4zqFVxIyL4cu4TAz1algb0XjPKbgksqJu9CrJG7qcxtYSfVyFb4o/5I4i7nDRkRaaUEP5jDBDAS7MdXH1EwoZgVK7cr7xb/AW0SGcdTvs6EAAAAAElFTkSuQmCC",
                    anchorText: [0, -2],
                    height: 44,
                    width: 44
                }]
        };
        this.googleCluster = new MarkerClusterer.default(this.map.api, [], mcOptions);
    }

    addMarker(marker: BaseMarker, redraw?: boolean): void {

        this.googleCluster.addMarker(marker, redraw);

    }

    addMarkers(markers: Array<BaseMarker>, redraw?: boolean): void {

        this.googleCluster.addMarkers(markers, redraw);
    }

    refreshMarkers(): void {

        this.googleCluster.redraw_();

    }

    removeMarker(marker: BaseMarker) {

        this.googleCluster.removeMarker(marker, false);

    }

    removeMarkers() {

        this.googleCluster.clearMarkers();

    }

    resetViewport(): void {

        this.googleCluster.resetViewport_();
    }

}
