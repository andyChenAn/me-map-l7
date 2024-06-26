/**
 * @author : andy
 * @description : 图层数据类型
 */

import { IScaleOption, IScaleOptions } from "@antv/l7";
import { ClusterOption, SourceOption } from "./scene";

export type LayerType = 'point' | 'line' | 'polygon' | 'heatmap' | 'image' | 'raster';
// 图层动画属性类型
export type AnimateOption = {
  duration?: number;
  interval?: number;
  trailLength?: number;
  enable?: boolean;
  speed?: number;
  rings?: number;
}
/**
 * 点图层类型
 */
// 点图层形状类型
export type PointLayerShape = 'point' | 'circle' | 'square' | 'triangle' | 'hexagon' | 'image' | 'text';
// 图层事件类型
export type LayerEvent = {
  'on-click'?: (...args: any[])=>void;
  'on-dblclick'?: (...args: any[])=>void;
  'on-mousemove'?: (...args: any[])=>void;
  'on-mouseout'?: (...args: any[])=>void;
  'on-mouseup'?: (...args: any[])=>void;
  'on-mousedown'?: (...args: any[])=>void;
  'on-contextmenu'?: (...args: any[])=>void;
  'on-unclick'?: (...args: any[])=>void;
  'on-unmousemove'?: (...args: any[])=>void;
  'on-unmouseup'?: (...args: any[])=>void;
  'on-unmousedown'?: (...args: any[])=>void;
  'on-uncontextmenu'?: (...args: any[])=>void;
  'on-unpick'?: (...args: any[])=>void;
  'on-touchstart'?: (...args: any[])=>void;
  'on-touchend'?: (...args: any[])=>void;
  'on-inited'?: (...args: any[])=>void;
  'on-add'?: (...args: any[])=>void;
  'on-remove'?: (...args: any[])=>void;
  'on-legend'?: (...args: any[])=>void;
}
// 图层属性类型
export type LayerOptions = {
  type?: LayerType;
  id?: string;
  visible?: boolean;
  zIndex?: number;
  scale
  pickingBuffer?: number;
  blend?: "normal" | "additive" | "subtractive" | "max";
  enablePropagation?: boolean;
  // 数据过滤，调用该方法返回一个布尔值，为true则显示，反之不显示
  filter?: {
    type: string;
    callback?: (...args: any[]) => boolean;
  }
  // 图层大小
  size?: number | string | {
    type?: string;
    callback?: ((...args: any[]) => any) | any[];
  };
  scale?: string | {
    type?: string;
    callback?: ((...args: any[]) => any) | any[] | IScaleOptions;
  };
  // 图层颜色
  color?: string | {
    type?: string;
    callback?:  ((...args: any[]) => any) | any[];
  };
  // 图层形状
  shape?: LayerShape | {
    type?: string;
    callback?:  ((...args: any[]) => any) | any[];
  };
  // 图层样式
  style?: Record<string , any>;
  // 纹理，只在线图层支持
  texture?: string;
  // 开启或者关闭 mousehover 元素高亮效果
  active?: boolean | {color: string; mix: number};
  // 开启或者关闭 mouseclick 元素选中高亮效果
  select?: boolean | {color: string; mix: number};
  // 让用户可以主动设置图层的 autoFit 参数
  autoFit?: boolean;
  // 是否开启动画
  animate?: boolean | AnimateOption;
  // 图层图标
  icon?: LayerIcon | LayerIcon[];

  'on-click'?: (...args: any[])=>void;
  'on-dblclick'?: (...args: any[])=>void;
  'on-mousemove'?: (...args: any[])=>void;
  'on-mouseout'?: (...args: any[])=>void;
  'on-mouseup'?: (...args: any[])=>void;
  'on-mousedown'?: (...args: any[])=>void;
  'on-contextmenu'?: (...args: any[])=>void;
  'on-unclick'?: (...args: any[])=>void;
  'on-unmousemove'?: (...args: any[])=>void;
  'on-unmouseup'?: (...args: any[])=>void;
  'on-unmousedown'?: (...args: any[])=>void;
  'on-uncontextmenu'?: (...args: any[])=>void;
  'on-unpick'?: (...args: any[])=>void;
  'on-touchstart'?: (...args: any[])=>void;
  'on-touchend'?: (...args: any[])=>void;
  'on-inited'?: (...args: any[])=>void;
  'on-add'?: (...args: any[])=>void;
  'on-remove'?: (...args: any[])=>void;
  'on-legend'?: (...args: any[])=>void;
}
// 点图层属性类型
export type PointLayerOptions = {
  id?: string;
  visible?: boolean;
  zIndex?: number;
  pickingBuffer?: number;
  blend?: "normal" | "additive" | "subtractive" | "max";
  enablePropagation?: boolean;
  // 数据过滤，调用该方法返回一个布尔值，为true则显示，反之不显示
  filter?: {
    type: string;
    callback?: (...args: any[]) => boolean;
  }
  // 图层大小
  size?: number | string | {
    type?: string;
    callback?: (...args: any[]) => any;
  };
  // 图层颜色
  color?: string | {
    type?: string;
    callback?: (...args: any[]) => any;
  };
  // 图层形状
  shape?: LayerShape | {
    type?: string;
    callback?: (...args: any[]) => any;
  };
  // 图层样式
  style?: Record<string , any>;
  // 纹理，只在线图层支持
  texture?: string;
  // 开启或者关闭 mousehover 元素高亮效果
  active?: boolean | {color: string; mix: number};
  // 开启或者关闭 mouseclick 元素选中高亮效果
  select?: boolean | {color: string; mix: number};
  // 让用户可以主动设置图层的 autoFit 参数
  autoFit?: boolean;
  // 是否开启动画
  animate?: boolean | AnimateOption;
  // 图层图标
  icon?: LayerIcon | LayerIcon[];

  'on-click'?: (...args: any[])=>void;
  'on-dblclick'?: (...args: any[])=>void;
  'on-mousemove'?: (...args: any[])=>void;
  'on-mouseout'?: (...args: any[])=>void;
  'on-mouseup'?: (...args: any[])=>void;
  'on-mousedown'?: (...args: any[])=>void;
  'on-contextmenu'?: (...args: any[])=>void;
  'on-unclick'?: (...args: any[])=>void;
  'on-unmousemove'?: (...args: any[])=>void;
  'on-unmouseup'?: (...args: any[])=>void;
  'on-unmousedown'?: (...args: any[])=>void;
  'on-uncontextmenu'?: (...args: any[])=>void;
  'on-unpick'?: (...args: any[])=>void;
  'on-touchstart'?: (...args: any[])=>void;
  'on-touchend'?: (...args: any[])=>void;
  'on-inited'?: (...args: any[])=>void;
  'on-add'?: (...args: any[])=>void;
  'on-remove'?: (...args: any[])=>void;
  'on-legend'?: (...args: any[])=>void;
};


/**
 * 线图层类型
 */
export type LineLayerShape = 'line' | 'arc' | 'arc3d' | 'greatcircle' | 'wall' | 'simple' | 'flowline';
// 线图层选项类型
export type LineLayerOptions = {
  id?: string;
  active?: boolean | {color: string; mix: number};
  visible?: boolean;
  zIndex?: number;
  minZoom?: number;
  // 数据过滤，调用该方法返回一个布尔值，为true则显示，反之不显示
  filter?: {
    type: string;
    callback?: (...args: any[]) => boolean;
  }
  maxZoom?: number;
  autoFit?: boolean;
  pickingBuffer?: number;
  blend?: "normal" | "additive" | "subtractive" | "max";
  enablePropagation?: boolean;
  maskLayers?: LineLayerOptions[];
  enableMask?: boolean;
  maskInside?: boolean;
  maskOpetation?: 'or' | 'and';
  // 图层大小
  size?: number | string | {
    type?: string;
    callback?: (...args: any[]) => any;
  };
  // 图层颜色
  color?: string | {
    type?: string;
    callback?: (...args: any[]) => any;
  };
  // 图层形状
  shape?: LineLayerShape;
  // 线图层支持纹理贴图，这里放的就是通过addImage添加的图标的名称，可以作为贴图
  texture?: string;
  // 是否开启动画
  animate?: boolean | AnimateOption;
  // 线的样式
  style?: Record<string , any>;
  
  'on-click'?: (...args: any[])=>void;
  'on-dblclick'?: (...args: any[])=>void;
  'on-mousemove'?: (...args: any[])=>void;
  'on-mouseout'?: (...args: any[])=>void;
  'on-mouseup'?: (...args: any[])=>void;
  'on-mousedown'?: (...args: any[])=>void;
  'on-contextmenu'?: (...args: any[])=>void;
  'on-unclick'?: (...args: any[])=>void;
  'on-unmousemove'?: (...args: any[])=>void;
  'on-unmouseup'?: (...args: any[])=>void;
  'on-unmousedown'?: (...args: any[])=>void;
  'on-uncontextmenu'?: (...args: any[])=>void;
  'on-unpick'?: (...args: any[])=>void;
  'on-touchstart'?: (...args: any[])=>void;
  'on-touchend'?: (...args: any[])=>void;
  'on-inited'?: (...args: any[])=>void;
  'on-add'?: (...args: any[])=>void;
  'on-remove'?: (...args: any[])=>void;
  'on-legend'?: (...args: any[])=>void;
}


/**
 * 面图层类型
 */
// 面图层形状类型
export type PolygonLayerShape = 'fill' | 'extrude' | 'extrusion' | 'water' | 'ocean' | 'line' | 'point_fill' | 'point_image' | 'point_extrude' | 'text';
export type PolygonLayerOptions = {
  id?: string;
  active?: boolean | {color: string; mix: number};
  visible?: boolean;
  zIndex?: number;
  minZoom?: number;
  // 数据过滤，调用该方法返回一个布尔值，为true则显示，反之不显示
  filter?: {
    type: string;
    callback?: (...args: any[]) => boolean;
  }
  maxZoom?: number;
  autoFit?: boolean;
  pickingBuffer?: number;
  blend?: "normal" | "additive" | "subtractive" | "max";
  enablePropagation?: boolean;
  maskLayers?: LineLayerOptions[];
  enableMask?: boolean;
  maskInside?: boolean;
  maskOpetation?: 'or' | 'and';
  // 图层大小
  size?: number | string | {
    type?: string;
    callback?: (...args: any[]) => any;
  };
  // 图层颜色
  color?: string | {
    type?: string;
    callback?: (...args: any[]) => any;
  };
  // 图层形状
  shape?: PolygonLayerShape;
  // 图层支持纹理贴图，这里放的就是通过addImage添加的图标的名称，可以作为贴图
  texture?: string;
  // 是否开启动画
  animate?: boolean | AnimateOption;
  // 图层的样式
  style?: Record<string , any>;
  'on-click'?: (...args: any[])=>void;
  'on-dblclick'?: (...args: any[])=>void;
  'on-mousemove'?: (...args: any[])=>void;
  'on-mouseout'?: (...args: any[])=>void;
  'on-mouseup'?: (...args: any[])=>void;
  'on-mousedown'?: (...args: any[])=>void;
  'on-contextmenu'?: (...args: any[])=>void;
  'on-unclick'?: (...args: any[])=>void;
  'on-unmousemove'?: (...args: any[])=>void;
  'on-unmouseup'?: (...args: any[])=>void;
  'on-unmousedown'?: (...args: any[])=>void;
  'on-uncontextmenu'?: (...args: any[])=>void;
  'on-unpick'?: (...args: any[])=>void;
  'on-touchstart'?: (...args: any[])=>void;
  'on-touchend'?: (...args: any[])=>void;
  'on-inited'?: (...args: any[])=>void;
  'on-add'?: (...args: any[])=>void;
  'on-remove'?: (...args: any[])=>void;
  'on-legend'?: (...args: any[])=>void;
}

/**
 * 聚合图层类型
 */
export type ClusterLayerOptions = {
  // 图层id
  id?: string;
  // 是否聚合
  cluster?: boolean;
  // 聚合选项
  clusterOptions?: ClusterOption;
  // 图层数据源
  data?: any;
  // 图层层级
  zIndex?: number;
  // 数据过滤，调用该方法返回一个布尔值，为true则显示，反之不显示
  filter?: {
    type: string;
    callback?: (...args: any[]) => boolean;
  }
  // 图层大小
  size?: number | string | {
    type?: string;
    callback?: (...args: any[]) => any;
  };
  // 图层颜色
  color?: string | {
    type?: string;
    callback?: (...args: any[]) => any;
  };
  // 图层形状
  shape?: LayerShape | {
    type?: string;
    callback?: (...args: any[]) => any;
  };
  // 图层样式
  style?: Record<string , any>;
  // 图层支持纹理贴图，这里放的就是通过addImage添加的图标的名称，可以作为贴图
  texture?: string;
  // 是否开启动画
  animate?: boolean | AnimateOption;
  active?: boolean | {color: string; mix: number};
  visible?: boolean;
  'on-click'?: (...args: any[])=>void;
  'on-dblclick'?: (...args: any[])=>void;
  'on-mousemove'?: (...args: any[])=>void;
  'on-mouseout'?: (...args: any[])=>void;
  'on-mouseup'?: (...args: any[])=>void;
  'on-mousedown'?: (...args: any[])=>void;
  'on-contextmenu'?: (...args: any[])=>void;
  'on-unclick'?: (...args: any[])=>void;
  'on-unmousemove'?: (...args: any[])=>void;
  'on-unmouseup'?: (...args: any[])=>void;
  'on-unmousedown'?: (...args: any[])=>void;
  'on-uncontextmenu'?: (...args: any[])=>void;
  'on-unpick'?: (...args: any[])=>void;
  'on-touchstart'?: (...args: any[])=>void;
  'on-touchend'?: (...args: any[])=>void;
  'on-inited'?: (...args: any[])=>void;
  'on-add'?: (...args: any[])=>void;
  'on-remove'?: (...args: any[])=>void;
  'on-legend'?: (...args: any[])=>void;
}