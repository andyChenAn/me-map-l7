<template>
  <div class="me-scene" ref="containerRef"></div>
  <slot v-if="mapScene" />
</template>
<script lang="ts" setup>
import * as mapboxgl from 'mapbox-gl';
import MeScene from '../../../core/scene';
import { ref , onMounted, computed, onBeforeUnmount, nextTick, watch, provide } from 'vue';
import { SceneProps } from '../../../types/scene';
const props = withDefaults(defineProps<SceneProps>() , {});
const reuse = computed(() => {
  return !!props.reuse || props.reuse === '';
});
const canuse = computed(() => {
  return !!props.canuse || props.canuse === '';
});
const containerRef = ref();

// 地图场景
const mapScene = ref<MeScene>();
provide("mapScene" , mapScene);

onMounted(() => {
  if (!mapboxgl.supported()) {
    alert("该浏览器不支持mapbox，请升级浏览器版本！");
  } else {
    if (canuse.value) {
      // 如果地图已经加载完了，并且scene组件设置了canuse为true，那么表示我可以直接使用scene组件，不需要再重新去加载地图了
      mapScene.value = MeScene._sceneCache.pop() || MeScene._currentScene;
      return;
    }
    // 复用
    if (reuse.value) {
      mapScene.value = MeScene.reuse(containerRef.value , props);
    }
    // 创建
    if (!mapScene.value) {
      mapScene.value = new MeScene(mapboxgl.Map , containerRef.value , props);
    }
    nextTick(() => {
      if (mapScene.value) {
        mapScene.value.getMap()?.resize();
      }
    })
  }
});
watch(props , () => {
  if (mapScene.value) {
    mapScene.value.updateScene(props);
  }
})
onBeforeUnmount(() => {
  if (reuse) {
    // 复用地图
    mapScene.value?.recycle();
  } else if (!canuse && !reuse) {
    // 删除地图
    mapScene.value?.destroy();
  }
});
defineExpose({
  getScene () {
    return mapScene.value!.getScene();
  },
  getMap () {
    return mapScene.value!.getMap();
  },
  getDraw () {
    return mapScene.value!.getDraw();
  }
});
</script>
<style lang="less" scoped>
@import './scene.less';
</style>