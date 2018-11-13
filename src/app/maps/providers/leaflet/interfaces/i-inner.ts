export interface Class {
  extend(props: any): any;
  include(props: any): any;
  mergeOptions(props: any): any;
  addInitHook(initHookFn: () => void): any;
}
export interface Transformation {
  constructor(a: number, b: number, c: number, d: number);
  transform(point: Point, scale?: number): Point;
  untransform(point: Point, scale?: number): Point;
}
export interface LineUtil {
  simplify(points: Point[], tolerance: number): Point[];
  pointToSegmentDistance(p: Point, p1: Point, p2: Point): number;
  closestPointOnSegment(p: Point, p1: Point, p2: Point): Point;
  isFlat(latlngs: LatLngExpression[]): boolean;
}
export interface PolyUtil {
  clipPolygon(points: Point[], bounds: BoundsExpression, round?: boolean): Point[];
}
export interface DomUtil {
  get(element: string | HTMLElement): HTMLElement | null;
  getStyle(el: HTMLElement, styleAttrib: string): string | null;
  create(tagName: string, className?: string, container?: HTMLElement): HTMLElement;
  remove(el: HTMLElement): void;
  empty(el: HTMLElement): void;
  toFront(el: HTMLElement): void;
  toBack(el: HTMLElement): void;
  hasClass(el: HTMLElement, name: string): boolean;
  addClass(el: HTMLElement, name: string): void;
  removeClass(el: HTMLElement, name: string): void;
  setClass(el: HTMLElement, name: string): void;
  getClass(el: HTMLElement): string;
  setOpacity(el: HTMLElement, opacity: number): void;
  testProp(props: string[]): string | false;
  setTransform(el: HTMLElement, offset: Point, scale?: number): void;
  setPosition(el: HTMLElement, position: Point): void;
  getPosition(el: HTMLElement): Point;
  disableTextSelection(): void;
  enableTextSelection(): void;
  disableImageDrag(): void;
  enableImageDrag(): void;
  preventOutline(el: HTMLElement): void;
  restoreOutline(): void;
  TRANSFORM: string;
  TRANSITION: string;
  TRANSITION_END: string;
}
export interface CRS {
  latLngToPoint(latlng: LatLngExpression, zoom: number): Point;
  pointToLatLng(point: PointExpression, zoom: number): LatLng;
  project(latlng: LatLng | LatLngLiteral): Point;
  unproject(point: PointExpression): LatLng;
  scale(zoom: number): number;
  zoom(scale: number): number;
  getProjectedBounds(zoom: number): Bounds;
  distance(latlng1: LatLngExpression, latlng2: LatLngExpression): number;
  wrapLatLng(latlng: LatLng | LatLngLiteral): LatLng;
  code?: string;
  wrapLng?: [number, number];
  wrapLat?: [number, number];
  infinite: boolean;
}
export interface CRS {
  EPSG3395: CRS;
  EPSG3857: CRS;
  EPSG4326: CRS;
  Earth: CRS;
  Simple: CRS;
}
export interface Projection {
  project(latlng: LatLng | LatLngLiteral): Point;
  unproject(point: PointExpression): LatLng;
  bounds: Bounds;
}
export interface LatLng {
  constructor(latitude: number, longitude: number, altitude?: number);
  equals(otherLatLng: LatLngExpression, maxMargin?: number): boolean;
  toString(): string;
  distanceTo(otherLatLng: LatLngExpression): number;
  wrap(): LatLng;
  toBounds(sizeInMeters: number): LatLngBounds;
  lat: number;
  lng: number;
  alt?: number;
}
export interface LatLngLiteral {
  lat: number;
  lng: number;
}
export type LatLngTuple = [number, number];
export type LatLngExpression = LatLng | LatLngLiteral | LatLngTuple;
export interface LatLngBounds {
  constructor(southWest: LatLngExpression, northEast: LatLngExpression);
  constructor(latlngs: LatLngBoundsLiteral);
  extend(latlngOrBounds: LatLngExpression | LatLngBoundsExpression): this;
  pad(bufferRatio: number): LatLngBounds; // does this modify the current instance or does it return a new one?
  getCenter(): LatLng;
  getSouthWest(): LatLng;
  getNorthEast(): LatLng;
  getNorthWest(): LatLng;
  getSouthEast(): LatLng;
  getWest(): number;
  getSouth(): number;
  getEast(): number;
  getNorth(): number;
  contains(otherBoundsOrLatLng: LatLngBoundsExpression | LatLngExpression): boolean;
  intersects(otherBounds: LatLngBoundsExpression): boolean;
  overlaps(otherBounds: BoundsExpression): boolean;
  toBBoxString(): string;
  equals(otherBounds: LatLngBoundsExpression): boolean;
  isValid(): boolean;
}
export type LatLngBoundsLiteral = LatLngTuple[];
export type LatLngBoundsExpression = LatLngBounds | LatLngBoundsLiteral;
export type PointTuple = [number, number];
export interface Point {
  constructor(x: number, y: number, round?: boolean);
  clone(): Point;
  add(otherPoint: PointExpression): Point;
  subtract(otherPoint: PointExpression): Point;
  divideBy(num: number): Point;
  multiplyBy(num: number): Point;
  scaleBy(scale: PointExpression): Point;
  unscaleBy(scale: PointExpression): Point;
  round(): Point;
  floor(): Point;
  ceil(): Point;
  distanceTo(otherPoint: PointExpression): number;
  equals(otherPoint: PointExpression): boolean;
  contains(otherPoint: PointExpression): boolean;
  toString(): string;
  x: number;
  y: number;
}
export interface Coords extends Point {
  z: number;
}
export type PointExpression = Point | PointTuple;
export type BoundsLiteral = [PointTuple, PointTuple];
export interface Bounds {
  constructor(topLeft: PointExpression, bottomRight: PointExpression);
  constructor(points: Point[] | BoundsLiteral);
  extend(point: PointExpression): this;
  getCenter(round?: boolean): Point;
  getBottomLeft(): Point;
  getTopRight(): Point;
  getSize(): Point;
  contains(pointOrBounds: BoundsExpression | PointExpression): boolean;
  intersects(otherBounds: BoundsExpression): boolean;
  overlaps(otherBounds: BoundsExpression): boolean;
  min?: Point;
  max?: Point;
}
export type BoundsExpression = Bounds | BoundsLiteral;
export type LeafletEventHandlerFn = (event: LeafletEvent) => void;
export interface LeafletEventHandlerFnMap {
  [type: string]: LeafletEventHandlerFn;
}
export interface Evented extends Class {
  on(type: string, fn: LeafletEventHandlerFn, context?: any): this;
  on(eventMap: LeafletEventHandlerFnMap): this;
  off(type: string, fn?: LeafletEventHandlerFn, context?: any): this;
  off(eventMap: LeafletEventHandlerFnMap): this;
  off(): this;
  fire(type: string, data?: any, propagate?: boolean): this;
  listens(type: string): boolean;
  once(type: string, fn: LeafletEventHandlerFn, context?: any): this;
  once(eventMap: LeafletEventHandlerFnMap): this;
  addEventParent(obj: Evented): this;
  removeEventParent(obj: Evented): this;
  addEventListener(type: string, fn: LeafletEventHandlerFn, context?: any): this;
  addEventListener(eventMap: LeafletEventHandlerFnMap): this;
  removeEventListener(type: string, fn: LeafletEventHandlerFn, context?: any): this;
  removeEventListener(eventMap: LeafletEventHandlerFnMap): this;
  clearAllEventListeners(): this;
  addOneTimeEventListener(type: string, fn: LeafletEventHandlerFn, context?: any): this;
  addOneTimeEventListener(eventMap: LeafletEventHandlerFnMap): this;
  fireEvent(type: string, data?: any, propagate?: boolean): this;
  hasEventListeners(type: string): boolean;
}
export interface Draggable extends Evented {
  constructor(element: HTMLElement, dragStartTarget?: HTMLElement, preventOutline?: boolean);
  enable(): void;
  disable(): void;
  finishDrag(): void;
}
export interface LayerOptions {
  pane?: string;
  attribution?: string;
}
export interface InteractiveLayerOptions extends LayerOptions {
  interactive?: boolean;
}
export interface LayerGroup<P = any> {
  otherProps: number;
  setZIndex(id: number): Layer[];
}
export interface Layer extends Evented {
  constructor(options?: LayerOptions);
  addTo(map: LeafletMap | LayerGroup): this;
  remove(): this;
  removeFrom(map: LeafletMap): this;
  getPane(name?: string): HTMLElement | undefined;
  bindPopup(content: ((layer: Layer) => Content) | Content | Popup, options?: PopupOptions): this;
  unbindPopup(): this;
  openPopup(latlng?: LatLngExpression): this;
  closePopup(): this;
  togglePopup(): this;
  isPopupOpen(): boolean;
  setPopupContent(content: Content | Popup): this;
  getPopup(): Popup | undefined;
  bindTooltip(content: ((layer: Layer) => Content) | Tooltip | Content, options?: TooltipOptions): this;
  unbindTooltip(): this;
  openTooltip(latlng?: LatLngExpression): this;
  closeTooltip(): this;
  toggleTooltip(): this;
  isTooltipOpen(): boolean;
  setTooltipContent(content: Content | Tooltip): this;
  getTooltip(): Tooltip | undefined;
  onAdd(map: LeafletMap): this;
  onRemove(map: LeafletMap): this;
  getEvents?(): { [name: string]: (event: LeafletEvent) => void };
  getAttribution?(): string | null;
  beforeAdd?(map: LeafletMap): this;
}
export interface GridLayerOptions {
  tileSize?: number | Point;
  opacity?: number;
  updateWhenIdle?: boolean;
  updateWhenZooming?: boolean;
  updateInterval?: number;
  attribution?: string;
  zIndex?: number;
  bounds?: LatLngBoundsExpression;
  minZoom?: number;
  maxZoom?: number;
  noWrap?: boolean;
  pane?: string;
  className?: string;
  keepBuffer?: number;
}
export type DoneCallback = (error?: Error, tile?: HTMLElement) => void;
export interface InternalTiles {
  [key: string]: {
      active?: boolean,
      coords: Coords,
      current: boolean,
      el: HTMLElement,
      loaded?: Date,
      retain?: boolean,
  };
}
export interface GridLayer extends Layer {
  constructor(options?: GridLayerOptions);
  bringToFront(): this;
  bringToBack(): this;
  getContainer(): HTMLElement | null;
  setOpacity(opacity: number): this;
  setZIndex(zIndex: number): this;
  isLoading(): boolean;
  redraw(): this;
  getTileSize(): Point;
}
export interface TileLayerOptions extends GridLayerOptions {
  minZoom?: number;
  maxZoom?: number;
  maxNativeZoom?: number;
  minNativeZoom?: number;
  subdomains?: string | string[];
  errorTileUrl?: string;
  zoomOffset?: number;
  tms?: boolean;
  zoomReverse?: boolean;
  detectRetina?: boolean;
  crossOrigin?: boolean;
  [name: string]: any;
}
export interface WMSOptions extends TileLayerOptions {
  layers?: string;
  styles?: string;
  format?: string;
  transparent?: boolean;
  version?: string;
  crs?: CRS;
  uppercase?: boolean;
}
export interface WMSParams {
  format?: string;
  layers: string;
  request?: string;
  service?: string;
  styles?: string;
  version?: string;
  transparent?: boolean;
  width?: number;
  height?: number;
}
export interface ImageOverlayOptions extends LayerOptions {
  opacity?: number;
  alt?: string;
  interactive?: boolean;
  attribution?: string;
  crossOrigin?: boolean;
}
export interface ImageOverlay extends Layer {
  //constructor(imageUrl: string, bounds: LatLngBoundsExpression, options?: ImageOverlayOptions);
  setOpacity(opacity: number): this;
  bringToFront(): this;
  bringToBack(): this;
  setUrl(url: string): this;
  setBounds(bounds: LatLngBounds): this;
  getBounds(): LatLngBounds;
  getElement(): HTMLImageElement | undefined;
  options: ImageOverlayOptions;
}
export type LineCapShape = 'butt' | 'round' | 'square' | 'inherit';
export type LineJoinShape = 'miter' | 'round' | 'bevel' | 'inherit';
export type FillRule = 'nonzero' | 'evenodd' | 'inherit';

export interface PathOptions extends InteractiveLayerOptions {
  stroke?: boolean;
  color?: string;
  weight?: number;
  opacity?: number;
  lineCap?: LineCapShape;
  lineJoin?: LineJoinShape;
  dashArray?: string;
  dashOffset?: string;
  fill?: boolean;
  fillColor?: string;
  fillOpacity?: number;
  fillRule?: FillRule;
  renderer?: Renderer;
  className?: string;
}

export interface Path extends Layer {
  redraw(): this;
  setStyle(style: PathOptions): this;
  bringToFront(): this;
  bringToBack(): this;
  getElement(): Element | undefined;
  options: PathOptions;
}

export interface PolylineOptions extends PathOptions {
  smoothFactor?: number;
  noClip?: boolean;
}
export interface CircleMarkerOptions extends PathOptions {
  radius?: number;
}
export interface RendererOptions extends LayerOptions {
  padding?: number;
}
export interface Renderer extends Layer {
  constructor(options?: RendererOptions);
  options: RendererOptions;
}
export interface SVG extends Renderer { }
export interface SVG {
  create(name: string): SVGElement;
  pointsToPath(rings: PointExpression[], close: boolean): string;
}
export interface Canvas extends Renderer { }
export type Zoom = boolean | 'center';
export interface MapOptions {
  preferCanvas?: boolean;
  attributionControl?: boolean;
  zoomControl?: boolean;
  closePopupOnClick?: boolean;
  zoomSnap?: number;
  zoomDelta?: number;
  trackResize?: boolean;
  boxZoom?: boolean;
  doubleClickZoom?: Zoom;
  dragging?: boolean;
  crs?: CRS;
  center?: LatLngExpression;
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;
  layers?: Layer[];
  maxBounds?: LatLngBoundsExpression;
  renderer?: Renderer;
  fadeAnimation?: boolean;
  markerZoomAnimation?: boolean;
  transform3DLimit?: number;
  zoomAnimation?: boolean;
  zoomAnimationThreshold?: number;
  inertia?: boolean;
  inertiaDeceleration?: number;
  inertiaMaxSpeed?: number;
  easeLinearity?: number;
  worldCopyJump?: boolean;
  maxBoundsViscosity?: number;
  keyboard?: boolean;
  keyboardPanDelta?: number;
  scrollWheelZoom?: Zoom;
  wheelDebounceTime?: number;
  wheelPxPerZoomLevel?: number;
  tap?: boolean;
  tapTolerance?: number;
  touchZoom?: Zoom;
  bounceAtZoomLimits?: boolean;
}
export type ControlPosition = 'topleft' | 'topright' | 'bottomleft' | 'bottomright';
export interface ControlOptions {
  position?: ControlPosition;
}
export interface Control extends Class {
  constructor(options?: ControlOptions);
  getPosition(): ControlPosition;
  setPosition(position: ControlPosition): this;
  getContainer(): HTMLElement | undefined;
  addTo(map: LeafletMap): this;
  remove(): this;
  onAdd?(map: LeafletMap): HTMLElement;
  onRemove?(map: LeafletMap): void;
  options: ControlOptions;
}
export interface Attribution extends Control {
  constructor(options?: AttributionOptions);
  setPrefix(prefix: string): this;
  addAttribution(text: string): this;
  removeAttribution(text: string): this;
  options: AttributionOptions;
}

export interface LayersOptions extends ControlOptions {
  collapsed?: boolean;
  autoZIndex?: boolean;
  hideSingleBase?: boolean;
}
export interface LayersObject {
  [name: string]: Layer;
}
export interface Layers extends Control {
  constructor(baseLayers?: LayersObject, overlays?: LayersObject, options?: LayersOptions);
  addBaseLayer(layer: Layer, name: string): this;
  addOverlay(layer: Layer, name: string): this;
  removeLayer(layer: Layer): this;
  expand(): this;
  collapse(): this;
  options: LayersOptions;
}
export interface ScaleOptions extends ControlOptions {
  maxWidth?: number;
  metric?: boolean;
  imperial?: boolean;
  updateWhenIdle?: boolean;
}
export interface Scale extends Control {
  constructor(options?: ScaleOptions);
  options: ScaleOptions;
}
export interface Attribution extends Control {
  constructor(options?: AttributionOptions);
  setPrefix(prefix: string): this;
  addAttribution(text: string): this;
  removeAttribution(text: string): this;
  options: AttributionOptions;
}
export interface AttributionOptions extends ControlOptions {
  prefix?: string | boolean;
}
export interface DivOverlayOptions {
  offset?: PointExpression;
  zoomAnimation?: boolean;
  className?: string;
  pane?: string;
}
export interface PopupOptions extends DivOverlayOptions {
  maxWidth?: number;
  minWidth?: number;
  maxHeight?: number;
  autoPan?: boolean;
  autoPanPaddingTopLeft?: PointExpression;
  autoPanPaddingBottomRight?: PointExpression;
  autoPanPadding?: PointExpression;
  keepInView?: boolean;
  closeButton?: boolean;
  autoClose?: boolean;
  closeOnClick?: boolean;
}
export type Content = string | HTMLElement;
export interface Popup extends Layer {
  constructor(options?: PopupOptions, source?: Layer);
  getLatLng(): LatLng | undefined;
  setLatLng(latlng: LatLngExpression): this;
  getContent(): Content | ((source: Layer) => Content) | undefined;
  setContent(htmlContent: ((source: Layer) => Content) | Content): this;
  getElement(): HTMLElement | undefined;
  update(): void;
  isOpen(): boolean;
  bringToFront(): this;
  bringToBack(): this;
  openOn(map: LeafletMap): this;
  options: PopupOptions;
}
export type Direction = 'right' | 'left' | 'top' | 'bottom' | 'center' | 'auto';
export interface TooltipOptions extends DivOverlayOptions {
  pane?: string;
  offset?: PointExpression;
  direction?: Direction;
  permanent?: boolean;
  sticky?: boolean;
  interactive?: boolean;
  opacity?: number;
}
export interface Tooltip extends Layer {
  //constructor(options?: TooltipOptions, source?: Layer);
  setOpacity(val: number): void;
  getLatLng(): LatLng | undefined;
  setLatLng(latlng: LatLngExpression): this;
  getContent(): Content | undefined;
  setContent(htmlContent: ((source: Layer) => Content) | Content): this;
  getElement(): HTMLElement | undefined;
  update(): void;
  isOpen(): boolean;
  bringToFront(): this;
  bringToBack(): this;
  options: TooltipOptions;
}
export interface ZoomOptions {
  animate?: boolean;
}
export interface PanOptions {
  animate?: boolean;
  duration?: number;
  easeLinearity?: number;
  noMoveStart?: boolean;
}
export interface ZoomPanOptions extends ZoomOptions, PanOptions { }
export interface FitBoundsOptions extends ZoomOptions, PanOptions {
  paddingTopLeft?: PointExpression;
  paddingBottomRight?: PointExpression;
  padding?: PointExpression;
  maxZoom?: number;
}
export interface LocateOptions {
  watch?: boolean;
  setView?: boolean;
  maxZoom?: number;
  timeout?: number;
  maximumAge?: number;
  enableHighAccuracy?: boolean;
}
export interface Handler extends Class {
  constructor(map: LeafletMap);
  enable(): this;
  disable(): this;
  enabled(): boolean;
  addHooks?(): void;
  removeHooks?(): void;
}
export interface LeafletEvent {
  type: string;
  target: any;
}
export interface LeafletMouseEvent extends LeafletEvent {
  latlng: LatLng;
  layerPoint: Point;
  containerPoint: Point;
  originalEvent: MouseEvent;
}
export interface LeafletKeyboardEvent extends LeafletEvent {
  originalEvent: KeyboardEvent;
}
export interface LocationEvent extends LeafletEvent {
  latlng: LatLng;
  bounds: LatLngBounds;
  accuracy: number;
  altitude: number;
  altitudeAccuracy: number;
  heading: number;
  speed: number;
  timestamp: number;
}
export interface ErrorEvent extends LeafletEvent {
  message: string;
  code: number;
}
export interface LayerEvent extends LeafletEvent {
  layer: Layer;
}
export interface LayersControlEvent extends LayerEvent {
  name: string;
}
export interface TileEvent extends LeafletEvent {
  tile: HTMLImageElement;
  coords: Point; // apparently not a normal point, since docs say it has z (zoom)
}
export interface TileErrorEvent extends TileEvent {
  error: Error;
}
export interface ResizeEvent extends LeafletEvent {
  oldSize: Point;
  newSize: Point;
}
export interface GeoJSONEvent extends LeafletEvent {
  layer: Layer;
  properties: any;
  geometryType: string;
  id: string;
}
export interface PopupEvent extends LeafletEvent {
  popup: Popup;
}
export interface TooltipEvent extends LeafletEvent {
  tooltip: Tooltip;
}
export interface DragEndEvent extends LeafletEvent {
  distance: number;
}
export interface ZoomAnimEvent extends LeafletEvent {
  center: LatLng;
  zoom: number;
  noUpdate: boolean;
}
export interface DefaultMapPanes {
  mapPane: HTMLElement;
  tilePane: HTMLElement;
  overlayPane: HTMLElement;
  shadowPane: HTMLElement;
  markerPane: HTMLElement;
  tooltipPane: HTMLElement;
  popupPane: HTMLElement;
}
export interface LeafletMap extends Evented {
//   constructor(element: string | HTMLElement, options?: MapOptions);
  map(element: string | HTMLElement, options?: MapOptions): LeafletMap;
  tileLayer(urlTemplate: string, options?: TileLayerOptions): TileLayer;
  getRenderer(layer: Path): Renderer;
  addControl(control: Control): this;
  removeControl(control: Control): this;
  addLayer(layer: Layer): this;
  removeLayer(layer: Layer): this;
  hasLayer(layer: Layer): boolean;
  eachLayer(fn: (layer: Layer) => void, context?: any): this;
  openPopup(popup: Popup): this;
  openPopup(content: Content, latlng: LatLngExpression, options?: PopupOptions): this;
  closePopup(popup?: Popup): this;
  openTooltip(tooltip: Tooltip): this;
  openTooltip(content: Content, latlng: LatLngExpression, options?: TooltipOptions): this;
  closeTooltip(tooltip?: Tooltip): this;
  setView(center: LatLngExpression, zoom: number, options?: ZoomPanOptions): this;
  setZoom(zoom: number, options?: ZoomPanOptions): this;
  zoomIn(delta?: number, options?: ZoomOptions): this;
  zoomOut(delta?: number, options?: ZoomOptions): this;
  setZoomAround(position: Point | LatLngExpression, zoom: number, options?: ZoomOptions): this;
  fitBounds(bounds: LatLngBoundsExpression, options?: FitBoundsOptions): this;
  fitWorld(options?: FitBoundsOptions): this;
  panTo(latlng: LatLngExpression, options?: PanOptions): this;
  panBy(offset: PointExpression): this;
  setMaxBounds(bounds: LatLngBoundsExpression): this;
  setMinZoom(zoom: number): this;
  setMaxZoom(zoom: number): this;
  panInsideBounds(bounds: LatLngBoundsExpression, options?: PanOptions): this;
  invalidateSize(options?: boolean | ZoomPanOptions): this;
  stop(): this;
  flyTo(latlng: LatLngExpression, zoom?: number, options?: ZoomPanOptions): this;
  flyToBounds(bounds: LatLngBoundsExpression, options?: FitBoundsOptions): this;
  //addHandler(name: string, HandlerClass: typeof Handler): this; // Alternatively, HandlerClass: new(map: Map) => Handler
  remove(): this;
  createPane(name: string, container?: HTMLElement): HTMLElement;
  getPane(pane: string | HTMLElement): HTMLElement | undefined;
  getPanes(): { [name: string]: HTMLElement } & DefaultMapPanes;
  getContainer(): HTMLElement;
  whenReady(fn: () => void, context?: any): this;
  getCenter(): LatLng;
  getZoom(): number;
  getBounds(): LatLngBounds;
  getMinZoom(): number;
  getMaxZoom(): number;
  getBoundsZoom(bounds: LatLngBoundsExpression, inside?: boolean): number;
  getSize(): Point;
  getPixelBounds(): Bounds;
  getPixelOrigin(): Point;
  getPixelWorldBounds(zoom?: number): Bounds;
  // Conversion methods
  getZoomScale(toZoom: number, fromZoom: number): number;
  getScaleZoom(scale: number, fromZoom: number): number;
  project(latlng: LatLngExpression, zoom: number): Point;
  unproject(point: PointExpression, zoom: number): LatLng;
  layerPointToLatLng(point: PointExpression): LatLng;
  latLngToLayerPoint(latlng: LatLngExpression): Point;
  wrapLatLng(latlng: LatLngExpression): LatLng;
  wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds;
  distance(latlng1: LatLngExpression, latlng2: LatLngExpression): number;
  containerPointToLayerPoint(point: PointExpression): Point;
  containerPointToLatLng(point: PointExpression): LatLng;
  layerPointToContainerPoint(point: PointExpression): Point;
  latLngToContainerPoint(latlng: LatLngExpression): Point;
  mouseEventToContainerPoint(ev: MouseEvent): Point;
  mouseEventToLayerPoint(ev: MouseEvent): Point;
  mouseEventToLatLng(ev: MouseEvent): LatLng;
  locate(options?: LocateOptions): this;
  stopLocate(): this;
  markerClusterGroup();
  boxZoom: Handler;
  doubleClickZoom: Handler;
  dragging: Handler;
  keyboard: Handler;
  scrollWheelZoom: Handler;
  tap?: Handler;
  touchZoom: Handler;
  options: MapOptions;
}

export interface TileLayer extends GridLayer {
  setUrl(url: string, noRedraw?: boolean): this;
  _abortLoading(): void;
  _getZoomForUrl(): number;
  options: TileLayerOptions;
}

export interface Handler extends Class {
  constructor(map: LeafletMap);
  enable(): this;
  disable(): this;
  enabled(): boolean;
  addHooks?(): void;
  removeHooks?(): void;
}
export interface BaseIconOptions extends LayerOptions {
  iconUrl?: string;
  iconRetinaUrl?: string;
  iconSize?: PointExpression;
  iconAnchor?: PointExpression;
  popupAnchor?: PointExpression;
  tooltipAnchor?: PointExpression;
  shadowUrl?: string;
  shadowRetinaUrl?: string;
  shadowSize?: PointExpression;
  shadowAnchor?: PointExpression;
  className?: string;
}
export interface IconOptions extends BaseIconOptions {
  iconUrl: string;
}
export interface Icon<T extends BaseIconOptions = IconOptions> extends Layer {
  constructor(options: T);
  createIcon(oldIcon?: HTMLElement): HTMLElement;
  createShadow(oldIcon?: HTMLElement): HTMLElement;
  options: T;
}
export namespace Icon {
  interface DefaultIconOptions extends BaseIconOptions {
      imagePath?: string;
  }
  export interface Default extends Icon<DefaultIconOptions> {
      imagePath?: string;
      constructor(options?: DefaultIconOptions);
  }
}
export interface DivIconOptions extends BaseIconOptions {
  html?: string | false;
  bgPos?: PointExpression;
  iconSize?: PointExpression;
  iconAnchor?: PointExpression;
  popupAnchor?: PointExpression;
  className?: string;
}
export interface DivIcon extends Icon<DivIconOptions> {
  constructor(options?: DivIconOptions);
}
export interface MarkerOptions extends InteractiveLayerOptions {
  icon?: Icon | DivIcon;
  clickable?: boolean;
  draggable?: boolean;
  keyboard?: boolean;
  title?: string;
  alt?: string;
  zIndexOffset?: number;
  opacity?: number;
  riseOnHover?: boolean;
  riseOffset?: number;
}
export interface Marker<P = any> extends Layer {
  //  constructor(latlng: LatLngExpression, options?: MarkerOptions);
  getLatLng(): LatLng;
  setLatLng(latlng: LatLngExpression): this;
  setZIndexOffset(offset: number): this;
  setIcon(icon: Icon | DivIcon): this;
  setOpacity(opacity: number): this;
  getElement(): HTMLElement | undefined;
  options: MarkerOptions;
  dragging?: Handler;
}
export interface Util {
  extend(dest: any, src?: any): any;
  create(proto: any, properties?: any): any;
  bind(fn: () => void, ...obj: any[]): () => void;
  stamp(obj: any): number;
  throttle(fn: () => void, time: number, context: any): () => void;
  wrapNum(num: number, range: number[], includeMax?: boolean): number;
  falseFn(): false;
  formatNum(num: number, digits?: number): number;
  trim(str: string): string;
  splitWords(str: string): string[];
  setOptions(obj: any, options: any): any;
  getParamString(obj: any, existingUrl?: string, uppercase?: boolean): string;
  template(str: string, data: any): string;
  isArray(obj: any): boolean;
  indexOf(array: any[], el: any): number;
  requestAnimFrame(fn: () => void, context?: any, immediate?: boolean): number;
  cancelAnimFrame(id: number): void;
  lastId: number;
  emptyImageUrl: string;
}