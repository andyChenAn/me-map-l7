<template>
</template>
<script lang="ts" setup>
import { inject, onMounted, ref, watch } from 'vue';
import MeScene from '../../../core/scene';
import { BaseLayer } from '@antv/l7';
type SourceProps = {
  type?: string;
  features?: any[];
}
const props = withDefaults(defineProps<SourceProps>() , {});
const layer = ref(inject<BaseLayer>('layer'));
const mapScene = ref(inject<MeScene>('mapScene'));
watch(props , () => {
  if (layer.value) {
    layer.value.setData({...props})
  }
})
onMounted(() => {
  if (layer.value) {
    layer.value.source({...props});
    const scene = mapScene.value!.getScene()
    scene.addLayer(layer.value);
  }
})
</script>
<style lang="less" scoped></style>