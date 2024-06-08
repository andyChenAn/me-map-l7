<template>
  <slot v-if="layer" />
</template>
<script lang="ts" setup>
import { ref , inject , onMounted , onBeforeUnmount, provide , watch } from 'vue';
import { LayerIcon } from '../../../types/scene';
import { PointLayerOptions } from '../../../types/layer';
import { BaseLayer, Scene , PointLayer } from '@antv/l7';
import MeScene from '../../../core/scene';
import equal from '../../../utils/equal';
const props = withDefaults(defineProps<PointLayerOptions>() , {});
let oldProps: PointLayerOptions = {};
const mapScene = ref(inject<MeScene>('mapScene'))
const layer = ref<BaseLayer>();
provide('layer' , layer);
const initLayer = async () => {
  try {
    const { id , icon } = props;
    if (mapScene.value) {
      const scene = mapScene.value.getScene();
      // 加载图标
      await addIcon(mapScene.value as MeScene , icon!);
      const layer = scene.getLayerByName(id);
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
const updateLayer = (scene: Scene , newProps: PointLayerOptions , oldProps: PointLayerOptions) => {
  if (layer.value) {
    const { shape , color , size , style , active , select , autoFit , filter , texture  } = newProps;
    if (!equal(newProps.shape , oldProps.shape)) {
      if (typeof shape === 'string') {
        layer.value.shape(shape);
      } else if (typeof shape === 'object') {
        layer.value.shape(shape.type! , shape.callback);
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
    // 开启或者关闭 mouseclick 元素选中高亮效果
    if (!equal(newProps.select , oldProps.select)) {
      layer.value.select(select!);
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
/**
 * 创建图层
 * @param scene scene对象
 * @param props 属性数据
 */
const createLayer = (props: PointLayerOptions) => {
  let { id, visible , zIndex , autoFit , pickingBuffer , blend , shape , size , color , style , active , select , texture , filter } = props;
  layer.value = new PointLayer({
    name : id,
    visible : visible === undefined || true,
    zIndex : zIndex || 1,
    pickingBuffer : pickingBuffer,
    blend : blend
  });
  // 图层形状
  if (shape) {
    if (typeof shape === 'string') {
      layer.value.shape(shape);
    } else if (typeof shape === 'object') {
      layer.value.shape(shape.type! , shape.callback);
    }
  }
  // 图层大小
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
  // 开启或者关闭 mousehover 元素高亮效果
  layer.value.active(active! || false);
  // 开启或者关闭 mouseclick 元素选中高亮效果
  layer.value.select(select! || false);
  layer.value.setAutoFit(autoFit! || false);
  if (filter && typeof filter === 'object') {
    layer.value.filter(filter.type! , filter.callback);
  }
  if (texture && typeof texture === 'string') {
    layer.value.texture(texture);
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
watch(props , () => {
  initLayer();
})
onMounted(() => {
  initLayer();
})
onBeforeUnmount(() => {

})
defineExpose({
  getLayer () {
    return layer.value;
  }
})
</script>
<style lang="less" scoped></style>