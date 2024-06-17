import { Scene } from "@antv/l7";
import { BaseMode, DeepPartial, PointDrawer } from "@antv/l7-draw";
import { IPointDrawOptions, PointDrawEvent } from "../types/l7draw";
export default class L7Draw {
  // Scene实例对象
  private scene: Scene;
  // 缓存标绘，用于对创建的标绘管理
  private cache: Map<string , BaseMode> = new Map();
  constructor (scene: Scene) {
    this.scene = scene;
  }
  // 绑定点标绘事件
  bindPointDrawEvents (drawer: PointDrawer , events: PointDrawEvent) {
    if (events) {
      for (let key in events) {
        if (events[key as keyof PointDrawEvent] && typeof events[key as keyof PointDrawEvent] === 'function') {
          drawer.on(key as any , events[key as keyof PointDrawEvent]);
        }
      }
    }
  }
  drawPoint (options: DeepPartial<IPointDrawOptions>) {
    if (!options.name || typeof options.name !== 'string') {
      throw new Error('创建标绘时必须传入一个name选项，并且必须是字符串');
    }
    const drawer = new PointDrawer(this.scene , options);
    this.bindPointDrawEvents(drawer , options.events as PointDrawEvent);
    drawer.enable();
    this.addDrawer(options.name , drawer);
  }
  /**
   * 添加标绘
   * @param name 标绘名称
   * @param drawer 标绘实例对象
   */
  addDrawer (name: string , drawer: BaseMode) {
    this.cache.set(name , drawer);
  }
  /**
   * 根据标绘名称删除标绘
   * @param name 标绘名称
   */
  deleteDrawerByName (name: string) {
    const drawer = this.cache.get(name);
    if (drawer) {
      drawer.destroy();
      this.cache.delete(name);
    }
  }
  /**
   * 删除所有标绘
   */
  deleteAllDrawer () {
    const entries = this.cache.entries();
    for (const entry of entries) {
      const [name , drawer] = entry;
      drawer.destroy();
      this.cache.delete(name);
    }
  }
}