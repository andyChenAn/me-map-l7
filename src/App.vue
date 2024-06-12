<template>
  <button @click="onClick">click</button>
  <button>修改颜色</button>
  <div id="map" class="map">
    <MeScene ref="sceneRef" v-bind="mapConfig">
      <MeLayer v-bind="layerConfig">
        <MeSource v-bind="sourceConfig" />
      </MeLayer>
    </MeScene>
  </div>
</template>
<script setup lang="ts">



import { onMounted, ref } from 'vue';
import MeLayer from './me-map-l7/components/layer';
import MeScene from './me-map-l7/components/scene/src/scene.vue';
import MeSource from './me-map-l7/components/source';

const mapConfig = ref({
  center: [114.060288, 22.53684],
    zoom: 15.63,
  minZoom: 0,
  container : 'map',
  maxZoom: 18,
  reuse : true,
  mapStyle : 'mapbox://styles/mapbox/dark-v11',
  accessToken : 'pk.eyJ1IjoiZXRlcm5pdHkteHlmIiwiYSI6ImNqaDFsdXIxdTA1ODgycXJ5czdjNmF0ZTkifQ.zN7e588TqZOQMWfws-K0Yw',
});
const layerConfig = ref({
  id : 'a',
  type : 'point',
  size : 2,
  color : {
    type : 'h8',
    callback : ['#0A3663',
          '#1558AC',
          '#3771D9',
          '#4D89E5',
          '#64A5D3',
          '#72BED6',
          '#83CED6',
          '#A6E1E0',
          '#B8EFE2',
          '#D7F9F0',]
  }
})
const sourceConfig = ref({
  source : {
    type : 'FeatureCollection',
    features : []
  }
})
const onClick = () => {
  fetch('https://gw.alipayobjects.com/os/basement_prod/513add53-dcb2-4295-8860-9e7aa5236699.json')
    .then((res) => res.json())
  .then(data => {
    sourceConfig.value.source = data;
  })
}
</script>
<style scoped>
.map {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
