# Angular Модуль Maps (Google)

> A simple plugin.

```text
├── maps
└── h21-maps
└── h21-maps-component
└── h21-maps.module
└── abstract
└── classes
└── entity
└── enum
└── interfaces
├── providers
 └── google

```
### `Кратко о возможностях модуля:`

```javascript

- Динамическая загрузка массива точек (в области видимости карты);
- Добавление точки на карту;
- Группировка точек
- Добавление радиуса на карту и вывод точек вхождения в радиус;
- Добавление произвольной области на карту и вывод точек которые  входят в произвольную область;
- Перемещение точки на карте (или с радиусом);
- Поиск по карте и получение дополнительной информации о точке;
- При клике по карте получение информации о месте (о точке);
- Расчет дистанции от начальной точки;
- Построение маршрута от начальной до конечной точки;
- Информация о маршруте (время и дистанция) + рисунок в формате png о проложенном маршруте;
- Фильтрация по типу точки;
- Отображения слоя о дорожной ситуации;
- Отображение слоя о общественном транспорте;

```

#### `Подключение модуля:`
```javascript
<h21-maps></h21-maps>

<h21-maps [latitude]="27.215556209029693" [longitude]="18.45703125" [zoom]="3"  provider ="google"  [minZoom]="3"></h21-maps>

```

```javascript

import { H21MapsComponent } from "../app/docs/maps/h21-maps/h21-maps.component";

@ViewChild(H21MapsComponent) public maps: H21MapsComponent;

```

#### `Настройки по умолчанию:`
`Координаты центра карты:`

```javascript
latitude: number; // Пример 27.215556209029693
longitude: number; //Пример 18.45703125
```
 `Текущий зум карты`
```javascript
zoom: number; //Пример: 4
```
`Минимальный зум карты`
```javascript
minZoom: number; //Пример: 3
```
`Выбранный провайдер`
```javascript
provider: string; // Пример: google
```
#### `Callback модуля:`

### `Использование Callback внутри модуля (внутренние события карты ):`

BE.UIKit\sandbox\src\app\docs\maps\h21-maps\h21-maps.component.ts

```javascript
            this.manager.getActiveMap().callbackMap.on(CallbackName.onclickMapPlaceId, (placeId) => {
                this.onclickMapPlaceId.next(placeId);
            });
            this.manager.getActiveMap().callbackMap.on(CallbackName.onclickMapCoordinates, (position) => {
                this.onclickMapCoordinates.next(position);
            });
            this.manager.getActiveMap().callbackMap.on(CallbackName.detailsAddressResultPoint, (point) => {
                this.detailsAddressResultPoint.next(point);
            });
            this.manager.getActiveMap().callbackMap.on(CallbackName.geocoderAddressResult, (point) => {
                this.geocoderAddressResult.next(point);
            });
            this.manager.getActiveMap().callbackMap.on(CallbackName.searchResult, (arrayPoint) => {
                this.searchMapResult.next(arrayPoint);
            });

            this.manager.getActiveMap().callbackMap.on(CallbackName.searchDetailsResult, (point) => {
                this.searchMapDetailsResult.next(point);
            });

            this.manager.getActiveMap().callbackMap.on(CallbackName.changedBoundsMap, (bounds) => {
                this.onChangeBoundsMap.next(bounds);
            });
            this.manager.getActiveMap().callbackMap.on(CallbackName.initMap, (status) => {
                this.afterMapInit.next(status);
            });
            this.manager.getActiveMap().callbackMap.on(CallbackName.responseMapError, (status) => {
                this.responseMapError.next(status);
            });
            this.manager.getActiveMap().callbackMap.on(CallbackName.createRadius, (infoCicle) => {
                this.drawRadiusStart.next(infoCicle);
            });
            this.manager.getActiveMap().callbackMap.on(CallbackName.radiusChanged, (infoCicle) => {
                this.drawRadiusChanged.next(infoCicle);
            });
            this.manager.getActiveMap().callbackMap.on(CallbackName.radiusDragEnd, (infoCicle) => {
                this.drawRadiusDragEnd.next(infoCicle);
            });
            this.manager.getActiveMap().callbackMap.on(CallbackName.drawAreaStart, (position) => {
                this.drawAreaStart.next(position);
            });
            this.manager.getActiveMap().callbackMap.on(CallbackName.drawAreaDragEnd, (arrayCoordinates) => {
                this.drawAreaDragEnd.next(arrayCoordinates);
            });
            this.manager.getActiveMap().callbackMap.on(CallbackName.countLoadMarkers, (countLoadMarkers) => {
                this.countLoadsMarkers.next(countLoadMarkers);
            });

            this.manager.getActiveMap().callbackMap.on(CallbackName.markerClick, (pointId) => {
                this.markerClik.next(pointId);
            });
            this.manager.getActiveMap().callbackMap.on(CallbackName.markerDraggableEnd, (infoMarker) => {
                this.markerDraggableEnd.next(infoMarker);
            });

            this.manager.getActiveMap().callbackMap.on(CallbackName.markerDraggable, (infoMarker) => {
                this.markerDraggable.next(infoMarker);
            });

            this.manager.getActiveMap().callbackMap.on(CallbackName.infoRoute, (infoRoute) => {
                this.infoRoute.next(infoRoute);
            });
  
```




| Название метода обратного вызова                          |                                                                                      Описание                                                                                      |
|-----------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| CallbackName.onclickMapPlaceId, (placeId) =>              | Событие происходит при клике по карте (по poi point google maps), метод возвращает placeId;                                                                                        |
| CallbackName.onclickMapCoordinates, (position) =>         | Событие происходит при клике по карте, метод возвращает координаты;                                                                                                                |
| CallbackName.detailsAddressResultPoint, (point) =>        | Метод возвращает point (IPoint), callback происходить при обращении к методу getDetailsPoint(placeId: string);                                                                     |
| CallbackName.geocoderAddressResult, (point) =>            | Метод возвращает объект point (IPoint),callback происходит при обращении к методу getAddress(position: IPosition);                                                                 |
| CallbackName.searchResult, (arrayPoint) =>                | Метод возвращает массив point (IPoint),callback происходит при обращении к методу getAddress(position: IPosition);                                                                 |
| CallbackName.searchDetailsResult, (point) =>              | Метод возвращает объект point (IPoint),callback происходит при обращении к методу searchDetails(placeId: string);                                                                  |
| callbackMap.on(CallbackName.changedBoundsMap, (bounds) => | Метод вызывается при каждом изменении границ области видимости экрана                                                                                                              |
| CallbackName.initMap, (status) =>                         | Метод вызывается при инициализации карты                                                                                                                                            |
| CallbackName.responseMapError, (status) =>                | Метод вызывается когда возникает ошибка у провайдера карт (возвращается статус ошибки)                                                                                             |
| CallbackName.createRadius, (infoCicle) =>                 | Метод вызывается когда добавлен круг на карту (метод возвращает информацию о круге: -радиус -координаты центра круга                                                               |
| CallbackName.radiusChanged, (infoCicle) =>                | Метод вызывается когда изменен размер радиуса (метод возвращается информацию о круге -радиус -координаты центра круга                                                              |
| CallbackName.radiusDragEnd, (infoCicle) =>                | Метод вызывается когда изменен круг закончили перетаскивать на карте (метод возвращается информацию о круге  -радиус  -координаты центра круга                                     |
| CallbackName.drawAreaStart, (position) =>                 | Метод вызывается когда начали рисовать произвольную область на карте                                                                                                               |
| CallbackName.drawAreaDragEnd, (arrayCoordinates) =>       | Метод вызывается когда начали закончили рисовать произвольную область на карте (метод возвращает массив координат)                                                                 |
| CallbackName.countLoadMarkers, (countLoadMarkers) =>      | Метод вызывается при добавлении маркеров на карту (метод возвращает количество загруженных точек на карте)                                                                         |
| CallbackName.markerClick, (pointId) =>                    | Метод вызывается при клике на маркер (метод возвращает id выбранного маркера)                                                                                                      |
| CallbackName.markerDraggableEnd, (infoMarker) =>          | Метод вызывается когда маркер закончили перетаскивать (метод возвращает информацию о маркере:  -position;                                                                          |
| CallbackName.markerDraggable, (infoMarker) =>             | Метод вызывается когда сработал метод setDraggableMarker() (метод возвращает информацию о маркере:   -разрешено/запрещено перетаскивать маркер;                                    |
| CallbackName.infoRoute, (infoRoute) =>                    | Метод вызывается когда был построен маршрут на карте (метод возвращает информацию о маршруте (от начальной до конечной точки): о дистанции, времени в пути с учетом пробок или без |

#### Использование Callback при взаимодействии с другими компонентами:

#### `Использование обратного вызова в другом компоненте (Пример)`


```javascript
this.maps.searchMapResult.subscribe(arrayPoint => {
console.log('searchMapResult')
        });
// список всех доступных callback при взаимодействии с компонентами можно посмотреть ниже 

```

#### `Использование методов (Пример):`

```javascript
 let position = <Position>{
            latitude: this.latitude,
            longitude: this.longitude
        }
this.manager.getActiveMap().config.setCenter(position);

```

### `Список доступных callback:`

| Название метода обратного вызова |                                                                                      Описание                                                                                      |
|----------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| onclickMapPlaceId                | Событие происходит при клике по карте (по poi point google maps), метод возвращает placeId;                                                                                        |
| onclickMapCoordinates            | Событие происходит при клике по карте, метод возвращает координаты;                                                                                                                |
| detailsAddressResultPoint        | Метод возвращает point (IPoint), callback происходить при обращении к методу getDetailsPoint(placeId: string);                                                                     |
| geocoderAddressResult            | Метод возвращает объект point (IPoint),callback происходит при обращении к методу getAddress(position: IPosition);                                                                 |
| searchMapResult                  | Метод возвращает массив point (IPoint),callback происходит при обращении к методу getAddress(position: IPosition);                                                                 |
| searchMapDetailsResult           | Метод возвращает объект point (IPoint),callback происходит при обращении к методу searchDetails(placeId: string);                                                                  |
| onChangeBoundsMap                | Метод вызывается при каждом изменении границ области видимости экрана                                                                                                              |
| afterMapInit                     | Метод вызывается при инициализации карты                                                                                                                                            |
| responseMapError                 | Метод вызывается когда возникает ошибка у провайдера карт (возвращается статус ошибки)                                                                                             |
| drawRadiusStart                  | Метод вызывается когда добавлен круг на карту (метод возвращает информацию о круге: -радиус -координаты центра круга                                                               |
| drawRadiusChanged                | Метод вызывается когда изменен размер радиуса (метод возвращается информацию о круге -радиус -координаты центра круга                                                              |
| drawRadiusDragEnd                | Метод вызывается когда изменен круг закончили перетаскивать на карте (метод возвращается информацию о круге  -радиус  -координаты центра круга                                     |
| drawAreaStart                    | Метод вызывается когда начали рисовать произвольную область на карте                                                                                                               |
| drawAreaDragEnd                  | Метод вызывается когда начали закончили рисовать произвольную область на карте (метод возвращает массив координат)                                                                 |
| countLoadsMarkers                | Метод вызывается при добавлении маркеров на карту (метод возвращает количество загруженных точек на карте)                                                                         |
| markerClik                       | Метод вызывается при клике на маркер (метод возвращает id выбранного маркера)                                                                                                      |
| markerDraggableEnd               | Метод вызывается когда сработал метод setDraggableMarker() (метод возвращает информацию о маркере:   -разрешено/запрещено перетаскивать маркер;                                    |
| infoRoute                        | Метод вызывается когда был построен маршрут на карте (метод возвращает информацию о маршруте (от начальной до конечной точки): о дистанции, времени в пути с учетом пробок или без |


### `Добавление нового провайдера:`

#### `Для добавления нового провайдера необходимо:`


```javascript

- Зарегистрировать провайдера в менеджере карт (maps\entity\map-manager.ts);

```

```javascript
constructor(
        private googleMap: GoogleMap,
        private baiduMap: BaiduMap) {
        this.register(MapType.GOOGLE, googleMap);
        this.register(MapType.BAIDU, baiduMap);
        this.changeType(MapType.GOOGLE);
    }
```
 
 ```javascript

- Добавить весь функционал в папку (maps\providers) и название провайдера;
```

```javascript

- Прописать BE.UIKit\sandbox\src\app\docs\maps\h21-maps\h21-maps.module.ts
```

```javascript
import { MapManager } from './docs/maps/entity/map-manager';
import { GoogleMap } from './docs/maps/providers/google/map';
import { GoogleMarkerCluster } from './docs/maps/providers/google/cluster';
import { GoogleEvent } from './docs/maps/providers/google/event';
import { GoogleConfig } from './docs/maps/providers/google/config';
import { GoogleRouteBuilder } from './docs/maps/providers/google/route';
import { GoogleMarker } from './docs/maps/providers/google/marker';
import { GoogleMapOptions } from './docs/maps/providers/google/entity/google-map-options';
import { GeoContainer } from './docs/maps/entity/geo-container';
import { GoogleSearchMap } from './docs/maps/providers/google/search';
import { BaiduMap } from './docs/maps/providers/baidu/map';
import { BaiduMarkerCluster } from './docs/maps/providers/baidu/cluster';
import { BaiduEvent } from './docs/maps/providers/baidu/event';
import { BaiduConfig } from './docs/maps/providers/baidu/config';
import { BaiduRouteBuilder } from './docs/maps/providers/baidu/route';
import { BaiduMarker } from './docs/maps/providers/baidu/marker';
import { BaiduMapOptions } from './docs/maps/providers/baidu/entity/baidu-map-options';
import { BaiduSearchMap } from './docs/maps/providers/baidu/search';



providers: [
		MapManager,
		GoogleMap,
		GoogleMarkerCluster,
		GoogleEvent,
		GoogleConfig,
		GoogleRouteBuilder,
		GoogleMarker,
		GoogleMapOptions,
		GeoContainer,
		GoogleSearchMap,
		BaiduMap,
		BaiduMarkerCluster,
		BaiduEvent,
		BaiduConfig,
		BaiduRouteBuilder,
		BaiduMarker,
		BaiduMapOptions,
		BaiduSearchMap,
	],



```

В файле maps.const.json уже добавлены список провайдеров которых можно подключить:

```javascript
{
    "InitList": {
        "google": {
            "name": "google",
            "url": "https://maps.googleapis.com/maps/api/js?libraries=places,geometry,drawing&callback=APILoaded",    
            "key": "AIzaSyC7bK1ihkGvGumGoL2_kMR7tiB1CylMuHo",
            "language": "en",
            "version":"3.30"
        },
        "yandex": {
            "name": "yandex",
            "url": "https://api-maps.yandex.ru/2.1/?lang=en_US&onload=APILoaded",
            "key": "",
            "language": "ru_RU",
            "version":""
        },
        "baidu": {
            "name": "baidu",
            "url": "http://api.map.baidu.com/api?v=2.0&ak=fq2Bg4g7X0NVFZyRVsFpkxOjBGiIl9QA&callback=APILoaded",
            "key": "",
            "language": "ru_RU",
            "version":""
        },
        "leaflet": {
            "name": "leaflet",
            "url": "https://unpkg.com/leaflet@1.3.4/dist/leaflet.js",
            "key": "",
            "language": "ru",
            "version":""
        }
    }
}
```

```javascript
 - Для переключения карт
```

```javascript
 export enum MapType {
    GOOGLE = 'google',
    YANDEX = 'yandex',
    BAIDU = 'baidu',
    LEAFLET = 'leaflet'
}
```

```javascript
     this.manager.changeType(MapType.GOOGLE);
     this.manager.selectMap(MapType.GOOGLE);
```




### `Основные методы модуля:`
| Методы               | Описание                                                                                                                                                                                                                                                             |
|----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| addMarker            | addMarker (point)<br> Parameters:   <li>point : IPoint </li> <li> onSelectedPoint : boolean </li> Добавление маркера на карту                                                                                                                                        |
| drawShapeOnMap       | drawShapeOnMap (shapeType, radius?, center)<br> Parameters: <br> <li>shapeType: IPoint</li> <li>radius?: boolean </li> <li>center? : IPosition </li> <br> Return Value :  <li>None</li> Добавить круг или нарисовать произвольную область на карте                   |
| buildRoute           | buildRoute(pointStart,pointEnd,typeRoute,show?) <br> Parameters: <br> <li>pointStart: IPoint</li> <li>pointEnd: IPoint</li> <li>typeRoute : TypeRoute</li>  <li>show?: boolean </li> Return Value : <li> None </li> Построить маршрут от начальной до конечной точки |
| setCircleEditable    | setCircleEditable (enabled) <br> Parameters: <br> <li>enabled: boolean </li> Return Value :  <li>None</li> Установить редактирование окружности (радиуса) <br> Если `enabled` значение true, радиус можно редактировать. Значение по умолчанию - false.              |
| setCircleRadius      | setCircleRadius(radius) Parameters: <br> <li>radius: number </li> Return Value :  <li>None</li> Установить у окружности радиус <br> Радиус окружности нужно установить в метрах                                                                                      |
| setCircleDraggable   | setCircleDraggable(enabled) <br> Parameters: <br> <li>enabled: boolean </li> Return Value :  <li>None</li> Установить перемещение окружности по карте <br> Если `enabled` значение true, радиус можно перемещать по карте. Значение по умолчанию - false.            |
| setBindCicleToMarker | setBindCicleToMarker()<br> Arguments : None <br> Установить привязку окружности (радиуса) к маркеру,при перемещении маркера, окружность будет перемещаться с выбранным маркером <br> `Должен быть выбран selectedMarker `                                            |
| setLoadMarkers       | setLoadMarkers(enabled) <br> Parameters: <br> <li>enabled: boolean </li> Return Value : <li> None </li> Установить разрешение на загрузку точек в видимой области карты  <br> Если `enabled` значение true, загрузка разрешена. Значение по умолчанию - true.        |
| clearAllMap          | clearAllMap()<br> Arguments :  <li>None </li> Удалить все объекты с карты                                                                                                                                                                                            |
| clearMarkers         | clearMarkers()<br> Arguments : <li>None </li>  Удалить все маркеры с карты                                                                                                                                                                                           |
| clearRoutes          | clearRoutes()</br> Arguments :  <li>None </li> Удалить все построенные маршруты с карты                                                                                                                                                                              |
| clearPolygons        | clearPolygons()</br> Arguments :  <li>None </li> Удалить все полигоны с карты                                                                                                                                                                                        |
| clearCircle          | clearCircle()</br> Arguments :  <li>None </li> Удалить окружность с карты                                                                                                                                                                                            |
| zoomIn               | zoomIn()</br> Arguments : <br> </li>None <li> Увеличивает масштаб на 1 позицию                                                                                                                                                                                       |
| zoomOut              | zoomOut() <br> Arguments :  <li>None </li>  Уменьшить масштаб на 1 позицию                                                                                                                                                                                           |
| getLoadCountMarker   | getLoadCountMarker() <br> Arguments :  <li>None </li> Получить количество загруженных маркеров на карте                                                                                                                                                              |
| getAddress           | getAddress(position) Parameters: <br> <li>position: IPosition</li> Return Value : <li> None </li> callback Value :  <li>point:IPoint<li> Получение детальной информации о точке на основе переданных координат                                                       |
| getDetailsPoint      | getDetailsPoint(placeId)  <br> Parameters: <br> <li>placeId: string</li> Return Value :  <li>None </li> callback Value :  <li>point:IPoint<li> Получение детальной информации о точке на основе переданных place Id (идентификатор места google maps)                |
| getZoom              | getZoom() <br> Arguments : <li> None </li> Return Value : </li> number </li> Получение текущего масштаба карты                                                                                                                                                       |
| getBounds            | getBounds() <br> Arguments : <li> None </li> Return Value : <li> ILatLngBounds </li> Возвращает географические координаты видимого участка карты                                                                                                                     |
| getCenter            | getCenter() <br> Arguments : <li> None </li> Return Value : <li> ILatLng</li> Возвращает географические координаты центральной точки карты                                                                                                                           |
| setZoom              | setZoom(zoom)  <br> Parameters: <br> <li>zoom: number</li> Return Value :  <li>None</li> Установить масштаб на карте                                                                                                                                                 |
| setMinZoom           | setMinZoom() <br> Parameters: <br> <li>zoom: number</li> Return Value :  <li>None</li> Установить минимальный масштаб на карте                                                                                                                                       |
| setMaxZoom           | setMaxZoom() <br> Parameters: <br> <li>zoom: number</li> Return Value :  <li>None</li> Установить максимальный масштаб на карте                                                                                                                                      |
| setCenter            | setCenter() <br> Parameters: <br> <li>position: IPosition</li> Return Value :  <li>None</li> Установить центр карты                                                                                                                                                  |
| setClikMap           | setClikMap(enabled) <br> Parameters: <br> <li>enabled: boolean </li> Return Value : <li> None </li> Установить разрешение на событие клика по карте <br> Если `enabled` значение true, клик разрешен. Значение по умолчанию - false.                                 |
| getRouteInfo         | getRouteInfo() <br> Arguments : <li> None </li> Return Value : <li> IRouteInfo</li> Возвращает информацию о построенном маршруте                                                                                                                                     |
| search               | search(query) <br> Parameters: <br> <li>query: string</li> Return Value : <li> Array <IPoint ></li> Поиск на карте <br>                                                                                                                                              |
| searchDetails        | searchDetails(placeId) <br> Parameters: <br> <li>query: string</li> Return Value : <li> Array <IPoint></li> Observable: <li><IPoint></li> callback: <li>IPoint</li> Получение детальной информации о точке поиска на основе placeId  <br>                            |
| getSelectedMarker    | getSelectedMarker() <br> Arguments :  <li> None </li> Return Value : <li>BaseMarker</li> Возвращает выбранный маркер                                                                                                                                                 |
| setSelectedMarker    | setSelectedMarker(marker) <br> Parameters: <br> <li>marker: BaseMarker</li> Return Value : <li> None <IPoint></li> Установить выбранный маркер <br>                                                                                                                  |
| resizeMap            | resizeMap(onCenter) <br> Parameters: <br> <li>onCenter: boolean</li> Return Value : <li> None</li> Можно вызвать данный метод при изменении размеров контейнера карты <br> `onCenter`выставить карту по центру                                                       |
| toggleMapDragging    | toggleMapDragging(enabled) <br> Parameters: <br> <li>enabled: boolean</li> Return Value : <li> None</li> Перемещение по карте <br> Если `enabled` значение true, перемещение по карте разрешено. Значение по умолчанию - true.                                       |
| setDraggableMarker   | setDraggableMarker(enabled) <br> Parameters: <br> <li>enabled: boolean</li> Return Value : <li> None</li> Перемещение маркера по карте <br> Если `enabled` значение true, перемещение маркера по карте разрешено. Значение по умолчанию - false.                     |
| toggleTrafficLayer   | toggleTrafficLayer(show) <br> Parameters: <br> <li>show: boolean</li> Return Value : <li> None</li> Показать на карте слой с дорожно-транспортной информацией. <br> Если `enabled` значение true, слой показан на карте. Значение по умолчанию - false.              |
| toggleTransitLayer   | toggleTransitLayer(show) <br> Parameters: <br> <li>show: boolean</li> Return Value : <li> None</li> Показать на карте слой общественного транспорта. <br> Если `enabled` значение true, слой показан на карте. Значение по умолчанию - false.                        |
#### `.drawMarkersOnMap()`

```javascript
drawMarkersOnMap(); //Динамически подгружает точки (markers) на карту добавляю в группы (markercluster), добавление точек происходит при зуме > 5, а удаление при зуме менее 3 
```

#### `.showMarker(point: IPoint)`

```javascript
showMarker(point); //Добавляет точку (marker) на карту, принимает единственный параметр IPoint
```

```javascript

 point:IPoint; //Ниже приведены свойства объекта IPoint

 Обязательные поля:

 position: IPosition;
 - latitude: number;
 - longitude: number;

 Формат:
  { latitude: 40.749825, longitude: -73.987963};

 interface IPoint {
    title: string;
    name: string;
    photos: Array<IIcon>;
    address: IAddress;
    position: IPosition;
    rating: number;
    price: IPrice;
    cancellationPolicy: string;
    extras: string;
    tmcAgencyMargin: string;
    id: string;
    googlePlaceId: string;
    type: string;
    source: string;
    subtype: string;
}

 interface IAddress {
    country: string;
    city: string;
    house: string;
    postCode: string;
    countryCode: string;
    district: string;
    street: string;
    description: string;
}

 interface IPosition {
    latitude: number;
    longitude: number;
}

 interface IPrice {
    value: number;
    currency: string;
}

 interface IIcon {
    title: string;
    url: string;
}


```


#### `.drawShapeOnMap()`

```javascript
drawShapeOnMap(shapeType, radius?, center); //Добавить круг или нарисовать произвольную область на карте

shapeType:ShapeType; // Выбрать тип фигуры для построения на карте

export enum ShapeType {
    STOP = 'STOP',
    CIRCLE = 'CIRCLE',
    AREA = 'AREA',
}

radius?: number; // необязательный параметр (только для CIRCLE ) задать радиус у круга, в метрах

center: IPosition; // необязательный параметр (только для CIRCLE ), задать координаты начальной точки выставления круга
 - latitude: number;
 - longitude: number;

```


#### `.buildRoute()`

```javascript
buildRoute(pointStart,pointEnd,typeRoute,show?); //Построить маршрут от начальной до конечной точки

pointStart:IPoint;
pointEnd:IPoint;

typeRoute: TypeRoute; // необязательный параметр (только для CIRCLE ), задать координаты начальной точки выставления круга

 export enum TypeRoute {
    FLY = 'FLY',
    CAR = 'CAR',
}

show?:boolean; // необязательный параметр, отображать построенный маршрут на карте (или выставить только маркеры)

```

#### `.setCircleEditable()` 

```javascript
setCircleEditable(enabled);  //Разрешить/Запретить редактирование у круга радиуса
```

#### `.setCircleRadius()` 

```javascript
setCircleRadius(enabled);  //Установить радиус у круга
```


#### `.setCircleDraggable()` 

```javascript
setCircleDraggable(enabled);  //Разрешить/Запретить перемещение круга по карте
```

#### `.setBindCicleToMarker()` 

```javascript
setBindCicleToMarker();  //Привязать к радиусу маркер (при перемещении маркера на карте, круг будет перемещаться вместе с маркером)
```

#### `.polygonsContainsMarker()` 

```javascript
polygonsContainsMarker(marker: BaseMarker, polygon: IPolygonOptions): boolean  //Определяет вхождение точки (marker) в полигон
```


#### `.buildRoute()` 

```javascript
buildRoute(pointStart,pointEnd,typeRoute,show?);
```


#### `.radiusContainsMarker()` ..

```javascript
 radiusContainsMarker(marker: BaseMarker, position: IPosition): number; //Определяет вхождение точки (marker) в окружность (радиус)
```

#### `boundsExtend()` 

```javascript
 boundsContainsMarker(marker: BaseMarker): boolean; // Определяет вхождение точек (markers) в область видимости экрана
```


#### `draggableMarker()` 

```javascript
 draggableMarker(enabled: boolean): void; //Разрешить перемещение точки (marker)
```


#### `toggleTrafficLayer()` 

```javascript
 toggleTrafficLayer(show: boolean): void // Показать слой пробок на карте
```

#### `toggleTransitLayer()` 

```javascript
 toggleTransitLayer(show: boolean): void // Показать слой общественного транспорта на карте
```

#### `toggleTransitLayer()` 

```javascript
 toggleMapDragging(enabled: boolean): void; // Разрешить перемещение по карте
```

#### `search()` 

```javascript
  search(query: string): Array<IPoint>; // Текстовый поиск по карте, возвращает массив IPoint (количество результатов поиска ограниченно 5)
```


#### `getDetailsPoint()` 

```javascript
 getDetailsPoint(placeId: string): Observable<IPoint>; // Получить детальную информацию о точке (google) на карте, принимает параметр placeId google maps
```


#### `getAddress()` 

```javascript
 getAddress(coordinates: ILatLng): IPoint; // Получить  информацию о точке (google) на карте
```


#### `onClickMap()` 

```javascript
 onClickMap(event: IEventClickMap): void; // событие клика по карте
```


#### `zoomIn()` 

```javascript
 zoomIn(): void; // Увеличение зума на карте
```

 #### `zoomOut()` 

```javascript
 zoomOut(): void; // Уменьшение зума на карте
```

#### `getZoom()` 

```javascript
 zoomOut(): void; // Получить текущий зум карты
```


#### `getBounds()` 

```javascript
 getBounds(): ILatLngBounds; // Получить координаты видимой области карты
```


#### `setZoom()` 

```javascript
 setZoom(zoom: number): void; // Установить минимальный зум карты
```

#### `setMinZoom()` 

```javascript
 setMinZoom(zoom: number): void; // Установить минимальный зум карты
```

#### `setMaxZoom()` 

```javascript
 setMaxZoom(zoom: number): void; // Установить максимальный зум карты
```


#### `setCenter()` 

```javascript
 setCenter(position: ILatLng): void; // Установить центр карты
```


