import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { Map } from "mapbox-gl";
import theme from "./theme";
import { DrawOptions, DrawStyle, MouseCursor } from '../types/draw';
import { Scene } from '@antv/l7';
type Noop = (evt: any) => void;
const noop = () => {};
export default class Draw {
  // mapbox地图实例
  private map: Map;
  // Scene实例
  private scene: Scene;
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
  constructor (map: Map , scene: Scene) {
    this.map = map;
    this.scene = scene;
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
    // 绑定事件
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
        const featureId = evt.features[0].id;
        if (this.updateCallbacks[featureId] && typeof this.updateCallbacks[featureId] === 'function' ) {
          this.updateCallbacks[featureId](evt);
        }
      }
    });
    this.map?.on('draw.delete' , (evt: any) => {
      if (evt.features.length > 0) {
        const featureId = evt.features[0].id;
        if (this.deleteCallbacks[featureId] && typeof this.deleteCallbacks[featureId] === 'function') {
          this.deleteCallbacks[featureId](evt);
        }
      }
      if (evt.features[0].properties.ranging) {
        // 如果是测距，当删除的时候，需要清除dom
        const ranges = document.querySelectorAll(".range-text");
        if (ranges && ranges.length > 0) {
          ranges.forEach(dom => {
            dom.parentNode?.removeChild(dom);
          })
        }
        this.draw?.changeMode('simple_select');
      }
    });
    this.map?.on('draw.selectionchange' , (evt: any) => {
      if (evt.features.length > 0) {
        const featureId = evt.features[0].id;
        if (this.selectionchangeCallbacks[featureId] && typeof this.selectionchangeCallbacks[featureId] === 'function') {
          this.selectionchangeCallbacks[featureId](evt);
        }
      } else {
        // 当不选中的时候，就触发所有绑定的selecitonchange事件，因为不选中的时候，我们没法知道featureId，所以这里就直接全部都执行
        for (let key in this.selectionchangeCallbacks) {
          if (this.selectionchangeCallbacks[key] && typeof this.selectionchangeCallbacks[key] === 'function') {
            this.selectionchangeCallbacks[key](evt);
          }
        }
      }
    })
  }
  /**
   * 设置标绘事件监听器
   * @param options 标绘配置选项
   */
  setDrawHandlers (options: DrawOptions = {}) {
    // 创建标绘时的回调
    this.create = (evt: any) => {
      this.setCanvasCursor('grab');
      const featureId = evt.features[0].id;
      // 当创建成功的时候更新样式
      if (evt.features.length > 0) {
        if (options.style && typeof options.style === 'object') {
          this.draw?.setFeatureProperty(featureId , 'custom' , true);
          // 更新样式
          this.updateStyle(featureId , options.style , true);
        }
      }
      options.create = options.create || noop;
      options.create(evt);
      if (options.ranging) {
        // 如果是测距
        setTimeout(() => {
          this.draw?.changeMode('simple_select');
        } , 0)
      }
      this.updateCallbacks[featureId] || (this.updateCallbacks[featureId] = options.update || noop);
      this.deleteCallbacks[featureId] || (this.deleteCallbacks[featureId] = (evt: any) => {
        if (options.ranging) {
          // 如果是测距，当删除的时候，需要清除dom
          const ranges = document.querySelectorAll(".range-text");
          if (ranges && ranges.length > 0) {
            ranges.forEach(dom => {
              dom.parentNode?.removeChild(dom);
            })
          }
        }
        options.delete = options.delete || noop;
        options.delete(evt);
      });
      this.selectionchangeCallbacks[featureId] || (this.selectionchangeCallbacks[featureId] = options.selectionchange || noop);
    }
  }
  /**
   * 更新标绘样式
   * @param featureId featureId要素id
   * @param style 标绘样式
   * @param isFirstRender 是否第一次渲染
   */
  updateStyle (featureId: string , style: DrawStyle , isFirstRender: boolean) {
    for (const name in style) {
      this.draw?.setFeatureProperty(featureId , name , style[name as keyof DrawStyle]);
    }
    if (!isFirstRender) {
      // 控制样式更新
      const feature = this.draw?.get(featureId) as GeoJSON.Feature;
      this.draw?.add({
        type : "FeatureCollection",
        features : [feature]
      })
    }
  }
  /**
   * 设置光标类型
   * @param cursor 鼠标光标类型
   */
  setCanvasCursor (cursor: MouseCursor) {
    this.scene.getMapCanvasContainer().style.cursor = cursor;
  }
  /**
   * 画点
   * @param options 标绘配置选项
   */
  drawPoint (options: DrawOptions = {}) {
    this.setCanvasCursor('crosshair');
    this.setDrawHandlers(options);
    this.draw?.changeMode('draw_point');
  }
}