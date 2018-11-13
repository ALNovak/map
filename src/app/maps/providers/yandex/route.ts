import { AbstractRouteBuilder } from "../../abstract/abstract-route-builder";
import { RouteInfo } from "../../classes/route-info";

declare var ymaps;

export class YandexRouteBuilder extends AbstractRouteBuilder {
    build(): void {
        throw new Error("Method not implemented.");
    }
    
    getInfoDistance():RouteInfo {
        throw new Error("Method not implemented.");
    }

    showStartPoint(): void {
        throw new Error("Method not implemented.");
    }
    showFinishPoint(): void {
        throw new Error("Method not implemented.");
    }
    showRoute(typeRoute: string): void {
        throw new Error("Method not implemented.");
    }
}