// 标绘配置属性
export type DrawOptions = {
  create?: (evt: any) => void;
  update?: (evt: any) => void;
  delete?: (evt: any) => void;
  selectionchange?: (evt: any) => void;
  style?: DrawStyle;
}
// 标绘样式
export type DrawStyle = {
  // 面的填充色
  fillColor?: string;
  // 面的外面的那条线的颜色
  fillOutlineColor?: string;
  // 面的透明度
  fillOpacity?: number;
  // 线宽
  lineWidth?: number;
  // 线的填充色
  lineColor?: string;
  // 线的透明度
  lineOpacity?: number;
  // 顶点的填充色
  vertexColor?: string;
  // 顶点的半径
  vertexRadius?: number;
  // 圆圈(点)的颜色
  circleColor?: string;
  // 圆圈(点)的半径
  circleRadius?: number;
  // 圆圈(点)的透明度
  circleOpacity?: number;
}