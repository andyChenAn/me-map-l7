import { anchorType } from "@antv/l7";

export type MarkerOptions = {
  longitude?: number;
  latitude?: number;
  // 设置默认 marker 的颜色
  color?: string;
  // 自定义 marker DOM 节点
  element?: string | HTMLElement;
  // 锚点位置
  anchor?: 'center' | 'top' | 'top-left' |  'top-right' | 'bottom' | 'bottom-left' | 'bottom-right' | 'left' | 'right' | anchorType;
  // 偏移量  [ 0, 0 ] 分别表示 X, Y 的偏移量
  offsets?: [number , number];
  // 是否支持拖拽调整 Marker 位置
  draggable?: boolean;
  // 用户自定义属性，支持任意数据类型，存储 marker 属性信息
  extData?: any;

  'on-click'?: (...args: any[])=>void;
  'on-dblclick'?: (...args: any[])=>void;
  'on-mousemove'?: (...args: any[])=>void;
  'on-mouseout'?: (...args: any[])=>void;
  'on-mouseup'?: (...args: any[])=>void;
  'on-mousedown'?: (...args: any[])=>void;
  'on-contextmenu'?: (...args: any[])=>void;
  'on-dragstart'?: (...args: any[])=>void;
  'on-dragging'?: (...args: any[])=>void;
  'on-dragend'?: (...args: any[])=>void;
}