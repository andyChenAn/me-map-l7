/**
 * @author : andy
 * @description : 地图场景类
 */
import { Map } from "mapbox-gl";
import { Scene } from '@antv/l7';
import { Mapbox } from '@antv/l7-maps';
import equal from '../utils/equal'
import { MouseEvent , MapEvent , SceneEvent , SceneProps , LayerImageIcon } from '../types/scene';
type MapClassType = typeof Map;
type MapOptions = SceneProps;
const mouseEvents: Record<string , keyof MouseEvent> = {
  click : 'onClick',
  dblclick : 'onDblclick',
  mousemove : 'onMousemove',
  mousewheel : 'onMousewheel',
  mouseover : 'onMouseover',
  mouseout : 'onMouseout',
  mouseup : 'onMouseup',
  mousedown : 'onMousedown',
  contextmenu : 'onContextmenu',
  dragstart : 'onDragstart',
  dragging : 'onDragging',
  dragend : 'onDragend',
  webglcontextlost : 'onWebglcontextlost'
}
const mapEvents: Record<string , keyof MapEvent> = {
  loaded : 'onMapLoaded',
  mapmove : 'onMapmove',
  movestart : 'onMovestart',
  moveend : 'onMoveend',
  zoomchange : 'onZoomchange',
  zoomstart : 'onZoomstart',
  zoomend : 'onZoomend'
}
const sceneEvents: Record<string , keyof SceneEvent> = {
  loaded : 'onLoaded',
  resize : 'onResize'
};
// 保存事件回调函数
const handlers: Record<string , (...args: any[]) => void> = {}
export default class MeScene {
  // l7中的scene对象
  private scene: any = null;
  // 地图实例对象
  private map: Map | null = null;
  // 地图类
  private _MapClass: MapClassType;
  // 初始化地图的options属性
  private options: MapOptions;
  // 缓存的MeScene实例对象
  static _sceneCache: MeScene[] = [];
  constructor (MapClass: MapClassType , container: HTMLElement , options: MapOptions) {
    this._MapClass = MapClass;
    this.options = {...options};
    this.initScene(container);
  }
  initScene (container: HTMLElement) {
    const props: SceneProps = {};
    for (let key in this.options) {
      if (this.options[key as keyof SceneProps] || (this.options[key as keyof SceneProps] === '' || this.options[key as keyof SceneProps] === 0)) {
        props[key as keyof SceneProps] = this.options[key as keyof SceneProps];
      }
    }
    const map = new this._MapClass({
      ...props,
      style : props.mapStyle,
      container
    });
    this.scene = new Scene({
      id : container as HTMLDivElement,
      logoVisible : false,
      map : new Mapbox({
        mapInstance : map
      })
    });
    this.map = map;
    // 绑定事件
    this.bindEvents();
  }
  bindEvents () {
    for (let eventName in sceneEvents) {
      handlers[eventName] = this.wrapperSceneEvent.bind(this , eventName);
      this.scene.on(eventName , handlers[eventName]);
    }
    for (let eventName in mapEvents) {
      handlers[eventName] = this.wrapperMapEvent.bind(this, eventName);
      this.scene.on(eventName , handlers[eventName]);
    }
    for (let eventName in mouseEvents) {
      handlers[eventName] = this.wrapperMouseEvent.bind(this);
      this.scene.on(eventName , handlers[eventName]);
    }
  }
  wrapperMouseEvent (evt: any) {
    const handler = this.options[mouseEvents[evt.type] as keyof typeof this.options];
    if (handler && typeof handler === 'function') {
      handler(evt);
    }
  }
  wrapperMapEvent (eventName: string) {
    const handler = this.options[mapEvents[eventName] as keyof typeof this.options];
    if (handler && typeof handler === 'function') {
      handler()
    }
  }
  wrapperSceneEvent (eventName: string) {
    const handler = this.options[sceneEvents[eventName] as keyof typeof this.options];
    if (handler && typeof handler === 'function') {
      handler()
    }
  }
  static reuse (container: HTMLElement , options: MapOptions) {
    const instance = MeScene._sceneCache.pop();
    if (!instance) {
      return;
    }
    const map = instance.map;
    const oldContainer = map?.getContainer();
    container.className = oldContainer?.className!;
    while (oldContainer?.childNodes.length! > 0) {
      container.appendChild(oldContainer?.childNodes[0]!);
    }
    // @ts-ignore
    map._container = container;
    // 更新属性
    instance.updateScene({...options});
    return instance;
  }
  updateScene (options: MapOptions) {
    const oldOptions = this.options;
    const newOptions = options;
    // 更新相机相关数据，zoom，center，pitch，rotation
    this.updateCameraOptions(newOptions);
    // 更新配置数据
    this.updateMapConfig(newOptions , oldOptions);
    // 更新地图样式
    this.updateMapStyle(newOptions , oldOptions);
    this.options = {...options};
  }
  updateCameraOptions (options: MapOptions) {
    const { center , zoom , pitch , bearing } = options;
    center && this.scene.setCenter(center);
    zoom && this.scene.setZoom(zoom);
    pitch && this.scene.setPitch(pitch);
    bearing && this.scene.setRotation(bearing);
  }
  updateMapConfig (newOptions: MapOptions , oldOptions: MapOptions) {
    const attributes = ['minZoom' , 'maxZoom' , 'minPitch' , 'maxBounds' , 'renderWorldCopies'];
    const map = this.map;
    for (const key of attributes) {
      // @ts-ignore
      if (key in newOptions && !equal(newOptions[key] , oldOptions[key])) {
        // @ts-ignore
        map[`set${key[0].toUpperCase()}${key.slice(1)}`](newOptions[key]);
      }
    }
  }
  updateMapStyle (newOptions: MapOptions , oldOptions: MapOptions) {
    if (newOptions.mapStyle !== oldOptions.mapStyle) {
      this.scene.setMapStyle(newOptions.mapStyle);
    }
  }
  destroy () {
    this.scene.destroy();
    MeScene._sceneCache.pop();
  }
  recycle () {
    MeScene._sceneCache.push(this);
  }
  unbindEvents () {
    for (const eventName in handlers) {
      this.scene.off(eventName , handlers[eventName]);
    }
  }
  addImage (name: string , url: LayerImageIcon) {
    const map = this.map;
    return new Promise((resolve) => {
      if (!map) {
        throw new Error('地图还没有初始化完成');
      }
      if (!this.scene.hasImage(name)) {
        setTimeout(() => {
          this.scene.addImage(name , url);
          resolve(true)
        } , 16)
      }
    })
  }
  hasImage (name: string) {
    return this.scene.hasImage(name);
  }
  removeImage (name: string) {
    if (this.hasImage(name)) {
      this.scene.removeImage(name);
    }
  }
  getMap () {
    return this.map;
  }
  getScene () {
    return this.scene as Scene;
  }
}