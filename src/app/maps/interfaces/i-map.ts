import { IApiSettings } from "./i-api-settings";
import { AbstractMap } from "../abstract/abstract-map";
import { AbstractConfig } from "../abstract/abstract-config";
import { FetchStatus } from "../enum/e-fetch-status";

export interface IMap {

    source: IApiSettings;
    instance: AbstractMap;
    config: AbstractConfig;

    init(container: HTMLElement): AbstractMap;
    destroy(): void;
    onDataFetched(status: FetchStatus): void;
}