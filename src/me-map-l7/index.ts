import { Component } from "vue";
import MeScene from "./components/scene";
import MeHeatmapLayer from "./components/heatmap-layer";
import MeLayer from "./components/layer";
import MeSource from "./components/source";
import MeClusterlayer , { ClusterLayerProps } from "./components/cluster-layer";
import MeMarker from "./components/marker";
import MePopup from "./components/popup";
export type * from './types/layer';
export type * from './types/marker';
export type * from './types/popup';
export type * from './types/scene';
const components: Record<string , Component> = {
  MeScene,
  MeSource,
  MeLayer,
  MeHeatmapLayer,
  MeClusterlayer,
  MeMarker,
  MePopup
};
const install = function (app: any) {
  Object.keys(components).forEach((key) => {
    const component = components[key];
    if (component.name) {
      app.component(component.name, component);
    }
  });
};
// @ts-ignore
if (typeof window !== 'undefined' && window.Vue) {
  // @ts-ignore
  install(window.Vue)
};
export type {
  ClusterLayerProps,
}
export default {
  install,
  ...components
};