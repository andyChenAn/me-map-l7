<template>
  <button @click="onClick">click</button>
  <button @click="changeColor">修改颜色</button>
  <div id="map" class="map">
    <MeScene ref="sceneRef" v-bind="mapConfig" :on-loaded="onLoad">
      <MeHeatmapLayer v-bind="layerConfig" :on-click="clickLineLayer">
        <MeSource v-bind="sourceConfig.source" />
      </MeHeatmapLayer>
    </MeScene>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import MeScene from './me-map-l7/components/scene/src/scene.vue';
import MeHeatmapLayer from './me-map-l7/components/heatmap-layer/src/heatmap-layer.vue';
import MeSource from './me-map-l7/components/source/src/source.vue';
import { LayerOptions } from './me-map-l7/types/layer';
const mapConfig = ref({
  center : [127.5671666579043, 7.445038892195569],
  zoom: 2,
  minZoom: 0,
  container : 'map',
  maxZoom: 18,
  reuse : true,
  mapStyle : 'mapbox://styles/mapbox/streets-v11',
  accessToken : 'pk.eyJ1IjoiZXRlcm5pdHkteHlmIiwiYSI6ImNqaDFsdXIxdTA1ODgycXJ5czdjNmF0ZTkifQ.zN7e588TqZOQMWfws-K0Yw',
});
const layerConfig = ref<LayerOptions>({
  id : 'aa',
  color : '#f00',
  style : {
    intensity: 2,
    radius: 20,
    rampColors: {
      colors: ['#FF4818', '#F7B74A', '#FFF598', '#91EABC', '#2EA9A1', '#206C7C'].reverse(),
      positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
    },
  },
  active : {
    color : '#000',
    mix : 0.5
  }
})
const sourceConfig = ref({
  source : {
    type : 'FeatureCollection',
    features : []
  }
})
const sceneRef = ref();
const onLoad = () => {
  fetch('https://gw.alipayobjects.com/os/basement_prod/d3564b06-670f-46ea-8edb-842f7010a7c6.json')
  .then(res => res.json())
  .then(data => {
    sourceConfig.value.source = data;
  })
}
const onClick = () => {
  
}
onMounted(() => {
})
const changeColor = () => {
  layerConfig.value.shape = 'heatmap3D';
  // layerConfig.value.style!.intensity = 0.5;
  layerConfig.value.style!.rampColors.colors =  ['#FF4818', '#F7B74A', '#FFF598', '#F27DEB', '#8C1EB2', '#421EB2'].reverse();
}
const clickLineLayer = (evt: any) => {
  console.log(evt)
}

</script>
<style scoped>
.map {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
