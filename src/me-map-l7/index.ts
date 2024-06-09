import { Component } from "vue";
import MePointLayer from "./components/point-layer";
import MeLayer from "./components/layer";
import MeLineLayer from "./components/line-layer";
import MePolygonLayer from "./components/polygon-layer";
import MeScene from "./core/scene";
import MeSource from "./components/source";
const components: Record<string , Component> = {
  MePointLayer,
  MeLayer,
  MeLineLayer,
  MePolygonLayer,
  MeScene,
  MeSource
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
export default {
  install,
  ...components
};