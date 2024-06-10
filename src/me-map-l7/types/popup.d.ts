// 元素类型
export type ElementType = HTMLElement | HTMLElement[] | DocumentFragment | Text | string;
// 	Popup 箭头位置，可以控制 Popup 相对于经纬度点的展示位置
export type AnchorType =
| 'center'
| 'top'
| 'top-left'
| 'top-right'
| 'bottom'
| 'bottom-left'
| 'bottom-right'
| 'left'
| 'right';
// 弹框属性配置类型
export type PopupOptions = {
  // 经度
  longitude?: number;
  // 纬度
  latitude?: number;
  // Popup 内容展示的文本内容
  text?: string;
  // Popup 标题展示的自定义 HTML，可以传 HTML 字符串，也可以传 DOM 对象或数组
  html?: ElementType;
  // Popup 标题展示的自定义 HTML，可以传 HTML 字符串，也可以传 DOM 对象或数组
  title?: ElementType;
  // 点击地图区域时，是否关闭当前 Popup
  closeOnClick?: boolean;
  // 点击 Esc 键时，是否关闭当前 Popup
  closeOnEsc?: boolean
  maxWidth?: string;
  anchor?: AnchorType;
  offsets?: [number , number];
  autoPan?: boolean;
  autoClose?: boolean;
  followCursor?: boolean;
  closeButton?: boolean;
  stopPropagation?: boolean;

  onOpen?: () => void;
  onClose?: () => void;
  onShow?: () => void;
  onHide?: () => void;
}