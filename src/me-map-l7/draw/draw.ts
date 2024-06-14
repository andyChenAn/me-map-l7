import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { Map } from "mapbox-gl";
import theme from "./theme";
type Noop = (evt: any) => void;
const noop = () => {};
export default class Draw {
  // mapbox地图实例
  private map: Map | undefined = undefined;
  // Draw实例
  private draw: MapboxDraw | undefined = undefined;
  // 标绘创建时触发的事件回调
  create: Noop = noop;
  // 标绘更新时触发的事件回调
  updateCallbacks: Record<string , Noop> = {};
  // 标绘删除时触发的事件回调
  deleteCallbacks: Record<string , Noop> = {};
  // 标绘选中时触发的事件回调
  selectionchangeCallbacks: Record<string , Noop> = {};
  constructor (map: Map) {
    this.map = map;
    this.initDraw();
  }
  // 初始化标绘
  initDraw () {
    this.draw = new MapboxDraw({
      displayControlsDefault : false,
      defaultMode : 'simple_select',
      userProperties : true,
      styles : theme,
      modes : {
        ...MapboxDraw.modes
      }
    });
    this.map?.addControl(this.draw);
    // 初始化事件
    this.bindDrawEvents();
  }
  bindDrawEvents () {
    this.map?.on('draw.create' , (evt: any) => {
      if (this.create && typeof this.create === 'function') {
        this.create(evt);
      }
    });
    this.map?.on('draw.update' , (evt: any) => {
      if (evt.features.length > 0) {
        const featureId = evt.feature[0].id;

      }
    })
  }
}