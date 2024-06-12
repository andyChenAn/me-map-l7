<template>
</template>
<script lang="ts" setup>
import { inject, onMounted, ref, toRaw, watch } from 'vue';
import MeScene from '../../../core/scene';
import { BaseLayer } from '@antv/l7';
type SourceProps = {
  source : {
    type?: string;
    features?: any[];
  }
}
const props = withDefaults(defineProps<SourceProps>() , {});
const layerInstance = inject<Record<string , BaseLayer>>('layerInstance');
const mapScene = ref(inject<MeScene>('mapScene'));
watch(props , () => {
  const layer = layerInstance?.layer;
  if (layer) {
    console.time();
    layer.setData(toRaw(props.source))
    console.timeEnd()
  }
} , {
  deep : false,
})
onMounted(() => {
  const layer = layerInstance?.layer;
  if (layer) {
    layer.source(toRaw(props.source));
    const scene = mapScene.value!.getScene()
    scene.addLayer(layer);
  }
})
</script>
<style lang="less" scoped></style>