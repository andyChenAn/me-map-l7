<template>
  <slot v-if="loaded" />
</template>

<script lang='ts' setup>
import { provide , ref, onMounted, toRaw, watch, inject } from 'vue';
import { Source } from '@antv/l7';
import { SourceOptions } from '../../../types/scene';
import MeScene from '../../../core/scene';
const props = withDefaults(defineProps<SourceOptions>() , {
  data () {
    return {
      type : 'FeatureCollection',
      features : []
    }
  }
});
const loaded = ref(false);
const sourceInstance: Record<string , Source> = {
  source : null as any
};
provide('sourceInstance' , sourceInstance);
const mapScene = ref(inject<MeScene>('mapScene'))
const createSource = () => {
  if (mapScene.value) {
    const { data , options } = props;
    if (options) {
      sourceInstance.source = new Source(toRaw(data) , options);
    } else {
      sourceInstance.source = new Source(toRaw(data));
    }
    loaded.value = true;
  }
}
watch(props , () => {
  if (sourceInstance.source) {
    const { data } = props;
    console.time();
    sourceInstance.source.setData(toRaw(data));
    console.timeEnd();
  }
} , {
  deep : false
});
onMounted(() => {
  setTimeout(() => {
    createSource();
  })
})
</script>

<style lang='less' scoped>
</style>