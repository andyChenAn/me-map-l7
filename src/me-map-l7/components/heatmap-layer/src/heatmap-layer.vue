<template>
  <slot v-if="layer" />
</template>
<script lang="ts" setup>
import { onBeforeUnmount, onMounted , ref , inject, provide, watch } from 'vue';
import { LayerOptions } from '../../../types/layer';
import MeScene from '../../../core/scene';
import equal from '../../../utils/equal';
import { BaseLayer , Scene , HeatmapLayer } from '@antv/l7';
const props = withDefaults(defineProps<LayerOptions>() , {
  shape : 'heatmap',
  visible : true,
  zIndex : 1
});
let oldProps: LayerOptions = {};
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
    oldProps = JSON.parse(JSON.stringify(props));
  }
}
const updateLayer = (scene: Scene , newProps: LayerOptions , oldProps: LayerOptions) => {
  if (layer.value) {
    const { shape , style , color , size } = newProps;
    if (!equal(newProps.shape , oldProps.shape)) {
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
    console.log(newProps.style , oldProps.style)
    if (!equal(newProps.style , oldProps.style)) {
      if (style && typeof style === 'object') {
        layer.value.style(style);
      }
    }
    scene.render();
  }
}
const createLayer = (props: LayerOptions) => {
  const { zIndex , visible , id , pickingBuffer , blend , shape , size , style , color } = props;
  layer.value = new HeatmapLayer({
    name : id,
    zIndex : zIndex,
    visible : visible,
    pickingBuffer,
    blend
  });
  // 图层形状
  if (shape) {
    if (typeof shape === 'string') {
      layer.value.shape(shape);
    }
  }
  // 图层尺寸
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
  // 图层样式
  if (style && typeof style === 'object') {
    layer.value.style(style);
  }
  // 绑定事件
  bindEvents();
}
watch(props , () => {
  initLayer();
})
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
const removeLayer = () => {
  if (mapScene.value) {
    const scene = mapScene.value.getScene();
    scene.removeLayer(props.id);
  }
}
onMounted(() => {
  initLayer();
})
onBeforeUnmount(() => {
  unbindEvents();
  removeLayer();
})

</script>
<style lang="less" scoped></style>