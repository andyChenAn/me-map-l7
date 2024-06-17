import { DrawEvent, IPointDrawerOptions } from "@antv/l7-draw";
import { Feature } from "@turf/turf";
// 点标绘事件
export type PointDrawEvent = {
  init: (...args: any[]) => void;
  destroy: (...args: any[]) => void;
  enable: (...args: any[]) => void;
  disable: (...args: any[]) => void;
  clear: (...args: any[]) => void;
  add: (feature: Feature , featureList: Feature[]) => void;
  edit: (feature: Feature , featureList: Feature[]) => void;
  remove: (feature: Feature , featureList: Feature[]) => void;
  dragStart: (feature: Feature , featureList: Feature[]) => void;
  dragging: (feature: Feature , featureList: Feature[]) => void;
  dragEnd: (feature: Feature , featureList: Feature[]) => void;
  change: (featureList: Feature[]) => void;
}
// 点标绘选项配置
export interface IPointDrawOptions extends IPointDrawerOptions {
  // 标绘名称
  name?: string;
  // 标绘事件
  events?: PointDrawEvent;
}