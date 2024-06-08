<template>
  <slot v-if="layer" />
</template>

<script lang='ts' setup>
import { inject, onMounted, ref , provide, watch, onBeforeUnmount } from 'vue';
import MeScene from '../../../core/scene';
import equal from '../../../utils/equal';
import { BaseLayer, Scene , LineLayer, IAnimateOption } from '@antv/l7';
import { LineLayerOptions } from '../../../types/layer';
const props = withDefaults(defineProps<LineLayerOptions>() , {});
let oldProps: LineLayerOptions = {};
const mapScene = ref(inject<MeScene>('mapScene'));
const layer = ref<BaseLayer>();
provide('layer' , layer);
const layerEvents = {
  click : 'onClick',
  dblclick : 'onDblclick',
  mousemove : 'onMousemove',
  mouseout : 'onMouseout',
  mouseup : 'onMouseup',
  mousedown : 'onMousedown',
  contextmenu : 'onContextmenu',
  unclick : 'onUnclick',
  unmousemove : 'onUnmousemove',
  unmouseup : 'onUnmouseup',
  unmousedown : 'onUnmousedown',
  uncontextmenu : 'onUncontextmenu',
  unpick : 'onUnpick',
  touchstart : 'onTouchstart',
  touchend : 'onTouchend',
  inited : 'onInited',
  add : 'onAdd',
  remove : 'onRemove',
  legend : 'onLegend'
}
const initLayer = () => {
  const { id } = props;
  if (mapScene.value) {
    const scene = mapScene.value.getScene();
    const layer = scene.getLayerByName(id);
    if (layer) {
      // 更新图层
      updateLayer(scene , props , oldProps);
    } else {
      // 创建图层
      createLayer(props);
    }
    oldProps = {...oldProps , ...props};
  } 
}
const updateLayer = (scene: Scene , newProps: LineLayerOptions , oldProps: LineLayerOptions) => {
  if (layer.value) {
    const { shape , color , size , style , active , autoFit , filter , texture } = newProps;
    if (!equal(newProps.shape , oldProps.shape)) {
      console.log(2342)
      if (typeof shape === 'string') {
        layer.value.shape(shape);
      }
    }
    if (!equal(newProps.color , oldProps.color)) {
      if (typeof color === 'string') {
        layer.value.color(color);
      } else if (typeof color === 'object') {
        layer.value.color(color.type! , color.callback);
      }
    }
    if (!equal(newProps.size , oldProps.size)) {
      if (typeof size === 'number' || typeof size === 'string') {
        layer.value.size(size);
      } else if (typeof size === 'object') {
        layer.value.size(size.type! , size.callback);
      }
    }
    if (!equal(newProps.style , oldProps.style)) {
      if (style && typeof style === 'object') {
        layer.value.style(style);
      }
    }
    // 开启或者关闭 mousehover 元素高亮效果
    if (!equal(newProps.active , oldProps.active)) {
      layer.value.active(active!);
    }
    if (!equal(newProps.autoFit , oldProps.autoFit)) {
      layer.value.setAutoFit(autoFit!);
    }
    if (!equal(newProps.filter , oldProps.filter)) {
      if (filter && typeof filter === 'object') {
        layer.value.filter(filter.type! , filter.callback);
      }
    }
    if (!equal(newProps.texture , oldProps.texture)) {
      if (texture && typeof texture === 'string') {
        layer.value.texture(texture);
      }
    }
    scene.render();
  }
}
const createLayer = (props: LineLayerOptions) => {
  const { id , zIndex , visible , autoFit , pickingBuffer , blend , shape , size , color , style , texture , filter , animate , active } = props;
  layer.value = new LineLayer({
    name : id,
    visible : visible === undefined || true,
    zIndex : zIndex || 1,
    pickingBuffer,
    blend
  });
  // 图层形状
  if (shape) {
    if (typeof shape === 'string') {
      layer.value.shape(shape);
    }
  }
  // 图层的尺寸
  if (size) {
    if (typeof size === 'number' || typeof size === 'string') {
      layer.value.size(size);
    } else if (typeof size === 'object') {
      layer.value.size(size.type! , size.callback);
    }
  }
  // 图层颜色
  if (color) {
    if (typeof color === 'string') {
      layer.value.color(color);
    } else if (typeof color === 'object') {
      layer.value.color(color.type! , color.callback);
    }
  }
  // 图层纹理贴图
  if (texture && typeof texture === 'string') {
    layer.value.texture(texture);
  }
  // 图层样式
  if (style && typeof style === 'object') {
    layer.value.style(style);
  }
  // 图层过滤
  if (filter && typeof filter === 'object') {
    layer.value.filter(filter.type! , filter.callback);
  }
  // 开启或者关闭 mousehover 元素高亮效果
  layer.value.active(active! || false);
  layer.value.setAutoFit(autoFit! || false);
  // 图层动画
  layer.value.animate(animate as boolean | IAnimateOption);
  // 绑定事件
  bindEvents();
}
const bindEvents = () => {
  for (let eventName in layerEvents) {
    const handlerName = layerEvents[eventName as keyof typeof layerEvents];
    const handler = props[handlerName as keyof typeof props];
    if (typeof handler === 'function') {
      // @ts-ignore
      layer.value?.on(eventName , handler);
    }
  }
}
const unbindEvents = () => {
  for (let eventName in layerEvents) {
    const handlerName = layerEvents[eventName as keyof typeof layerEvents];
    const handler = props[handlerName as keyof typeof props];
    if (typeof handler === 'function') {
      // @ts-ignore
      layer.value?.off(eventName , handler);
    }
  }
}
watch(props , () => {
  initLayer();
})
onMounted(() => {
  initLayer();
})
onBeforeUnmount(() => {
  unbindEvents();
})
</script>
<style lang='less' scoped>
</style>