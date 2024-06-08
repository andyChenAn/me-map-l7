import { Component } from "vue";
import MePointLayer from "./components/point-layer";
const components: Record<string , Component> = {
  MePointLayer
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