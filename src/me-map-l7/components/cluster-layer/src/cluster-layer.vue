<template>
  <MeLayer v-bind="circleConfig" />
  <MeLayer v-bind="textConfig" />
</template>

<script lang='ts' setup>
import MeLayer from '../../layer';
import { LayerOptions } from '../../../types/layer';
import { ref, watch } from 'vue';
import { omit } from 'lodash-es';
export type ClusterLayerProps = {
  id: string;
  circle: LayerOptions;
  text: LayerOptions;
}
const props = withDefaults(defineProps<ClusterLayerProps>() , {});
const circleConfig = ref<LayerOptions>(Object.assign({
  id : props.id + '_circle',
  type : 'point',
  shape : 'circle',
} , omit(props.circle , ['id' , 'type' , 'shape'])));
const textConfig = ref<LayerOptions>(Object.assign({
  id : props.id + "_text",
  type : 'point',
  shape : {
    type : 'point_count',
    callback : 'text'
  }
} , omit(props.text , ['id' , 'type' , 'shape'])));
watch(props.circle , () => {
  circleConfig.value = { ...circleConfig.value , ...props.circle };
});
watch(props.text , () => {
  textConfig.value = { ...textConfig.value , ...props.text };
})
</script>