<template>
  <slot v-if="isInited" />
</template>
<script lang="ts" setup>
import { ref , inject , onMounted , onBeforeUnmount, provide , watch } from 'vue';
import { LayerIcon } from '../../../types/scene';
import { LayerOptions, LayerType } from '../../../types/layer';
import { BaseLayer, Scene , PointLayer, IAnimateOption, LineLayer, PolygonLayer } from '@antv/l7';
import MeScene from '../../../core/scene';
import equal from '../../../utils/equal';
const props = withDefaults(defineProps<LayerOptions>() , {});
let oldProps: LayerOptions = {};
const mapScene = ref(inject<MeScene>('mapScene'))
const isInited = ref(false); 
const layerInstance: Record<string , BaseLayer> = {
  layer : null as any
};
let layer: BaseLayer;
provide('layerInstance' , layerInstance);
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
const initLayer = async () => {
  try {
    const { id , icon , type } = props;
    if (mapScene.value) {
      const scene = mapScene.value.getScene();
      if (type === 'point') {
        // 加载图标
        await addIcon(mapScene.value as MeScene , icon!);
      }
      const layer = scene.getLayerByName(id!);
      if (layer) {
        // 更新图层
        updateLayer(scene , props , oldProps)
      } else {
        // 创建图层
        createLayer(props);
      }
      oldProps = {...oldProps , ...props};
    }
  } catch (err) {
    console.log(err);
  }
}
const updateLayer = (scene: Scene , newProps: LayerOptions , oldProps: LayerOptions) => {
  if (layer) {
    const { shape , color , size , style , active , select , autoFit , filter , texture  } = newProps;
    if (!equal(newProps.shape , oldProps.shape)) {
      if (typeof shape === 'string') {
        layer.shape(shape);
      } else if (typeof shape === 'object') {
        layer.shape(shape.type! , shape.callback);
      }
    }
    if (!equal(newProps.color , oldProps.color)) {
      if (typeof color === 'string') {
        layer.color(color);
      } else if (typeof color === 'object') {
        layer.color(color.type! , color.callback);
      }
    }
    if (!equal(newProps.size , oldProps.size)) {
      if (typeof size === 'number' || typeof size === 'string') {
        layer.size(size);
      } else if (typeof size === 'object') {
        layer.size(size.type! , size.callback);
      }
    }
    if (!equal(newProps.style , oldProps.style)) {
      if (style && typeof style === 'object') {
        layer.style(style);
      }
    }
    // 开启或者关闭 mousehover 元素高亮效果
    if (!equal(newProps.active , oldProps.active)) {
      layer.active(active!);
    }
    // 开启或者关闭 mouseclick 元素选中高亮效果
    if (!equal(newProps.select , oldProps.select)) {
      layer.select(select!);
    }
    if (!equal(newProps.autoFit , oldProps.autoFit)) {
      layer.setAutoFit(autoFit!);
    }
    if (!equal(newProps.filter , oldProps.filter)) {
      if (filter && typeof filter === 'object') {
        layer.filter(filter.type! , filter.callback);
      }
    }
    if (!equal(newProps.texture , oldProps.texture)) {
      if (texture && typeof texture === 'string') {
        layer.texture(texture);
      }
    }
    scene.render();
  }
}
/**
 * 创建图层
 * @param scene scene对象
 * @param props 属性数据
 */
const createLayer = (props: LayerOptions) => {
  let { type , id, visible , zIndex , autoFit , pickingBuffer , blend , shape , size , color , style , active , select , texture , filter , animate } = props;
  const layerMap: Record<LayerType , any> = {
    line : LineLayer,
    point : PointLayer,
    polygon : PolygonLayer
  }
  layer = new layerMap[type as keyof typeof layerMap]({
    name : id,
    visible : visible === undefined || true,
    zIndex : zIndex || 1,
    pickingBuffer : pickingBuffer,
    blend : blend
  });
  // 将layer图层对象保存到layerInstance中，保存在这里的目的是为了使用inject能获取到
  layerInstance.layer = layer;
  // 已经创建成功
  isInited.value = true;
  if (layer) {
    // 图层形状
    if (shape) {
      if (typeof shape === 'string') {
        layer.shape(shape);
      } else if (typeof shape === 'object') {
        layer.shape(shape.type! , shape.callback);
      }
    }
    // 图层大小
    if (size) {
      if (typeof size === 'number' || typeof size === 'string') {
        layer.size(size);
      } else if (typeof size === 'object') {
        layer.size(size.type! , size.callback);
      }
    }
    // 图层颜色
    if (color) {
      if (typeof color === 'string') {
        layer.color(color);
      } else if (typeof color === 'object') {
        layer.color(color.type! , color.callback);
      }
    }
    // 图层样式
    if (style && typeof style === 'object') {
      layer.style(style);
    }
    if (filter && typeof filter === 'object') {
      layer.filter(filter.type! , filter.callback);
    }
    if (texture && typeof texture === 'string') {
      layer.texture(texture);
    }
    // 开启或者关闭 mousehover 元素高亮效果
    layer.active(active! || false);
    // 开启或者关闭 mouseclick 元素选中高亮效果
    layer.select(select! || false);
    layer.setAutoFit(autoFit! || false);
    // 图层动画
    layer.animate(animate as boolean | IAnimateOption);
    bindEvents();
  }
}
const addIcon = async (mapScene: MeScene , icon: LayerIcon | LayerIcon[]) => {
  if (icon) {
    if (Array.isArray(icon)) {
      for (let iconObj of icon) {
        await mapScene.addImage(iconObj.name , iconObj.url);
      }
    } else {
      await mapScene.addImage(icon.name , icon.url);
    }
  }
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
defineExpose({
  getLayer () {
    return layer;
  }
})
</script>
<style lang="less" scoped></style>