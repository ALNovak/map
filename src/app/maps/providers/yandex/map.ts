import { AbstractMap } from "../../abstract/abstract-map";
import { IMapOptions } from "../../interfaces/i-map-options";
import { FetchStatus } from "../../enum/e-fetch-status";
import { Observable, Observer } from "rxjs";
import { IApiSettings } from "../../interfaces/i-api-settings";
import { YandexMapOptions } from "./entity/yandex-map-options";
import { Injectable } from "@angular/core";
import { YandexEvent } from "./event";
import { YandexConfig } from "./config";
import { ReadyStateScript } from "../../enum/e-ready-state-script";
import { YandexMarkerCluster } from "./cluster";
import { GeoContainer } from "../../entity/geo-container";
import { YandexSearchMap } from "./search";
import { YandexRouteBuilder } from "./route";

declare var ymaps;
declare var document;

@Injectable()
export class YandexMap extends AbstractMap {
    public get scriptSelector(): string {
        return "script[src*='api-maps']";
    };

    public get styleSelector(): string {
        return ".style[data-ymaps]";
    }

    constructor(mapOptions: YandexMapOptions, config: YandexConfig, events: YandexEvent, cluster: YandexMarkerCluster, geo: GeoContainer, search: YandexSearchMap, route: YandexRouteBuilder) {
        super(mapOptions, config, events, cluster, geo, search, route);

    }

    init(): void {
        try {
            this.api = new ymaps.Map(this.container, {
                center: [27.215556209029693, 18.45703125],
                behaviors: ['default', 'scrollZoom'],
                zoom: 3,
                controls: []
            });
        } catch (error) {

        }
    }

    onDataFetched(settings: IApiSettings): Observable<FetchStatus> {
        try {
            return new Observable((observer: Observer<FetchStatus>) => {

                let apiScript = document.createElement('script');
                let headElement = document.getElementsByTagName('head')[0];
                let apiUrl: string;
                apiScript.type = 'text/javascript';
                apiUrl = settings.url + '&key=' + settings.key + '&language=' + settings.language;
                apiScript.src = apiUrl;
                apiScript.id = 'mapAPI';

                if (apiScript.readyState) {
                    apiScript.onreadystatechange = () => {
                        if (apiScript.readyState === ReadyStateScript.loaded || apiScript.readyState === ReadyStateScript.complete) {
                            apiScript.onreadystatechange = null;
                        }
                    };
                } else {
                    window['APILoaded'] = () => {
                        this.OnReady();
                        observer.next(FetchStatus.SUCCESS);
                    }
                }
                apiScript.onerror = (error) => {
                    observer.next(FetchStatus.ERROR);
                };

                headElement.appendChild(apiScript);

            });
        } catch (error) {

        }
    }


    private OnReady() {

    }

    destroy(): void {
        super.destroy();
        ymaps = null;
        this.api.destroy();
    }

}
