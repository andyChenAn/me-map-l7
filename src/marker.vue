<template>
  <button @click="onClick">click</button>
  <button @click="changeColor">修改颜色</button>
  <div id="map" class="map">
    <MeScene ref="sceneRef" v-bind="mapConfig" :on-loaded="onLoad" :on-click="clickMap" :on-mousemove="onMousemove">
      <!-- <MePointLayer v-bind="layerConfig" :on-click="clickLineLayer">
        <MeSource v-bind="sourceConfig.source" />
      </MePointLayer> -->
      <MeMapPopup v-if="show" :latitude="latitude" :longitude="longitude" :on-hide="onClose">
        <div class="my-popup">
          <div>hello andy</div>
        </div>
      </MeMapPopup>
      <MeMarker v-if="showMarker" :longitude="longitude" :latitude="latitude" :on-mousedown="onMousedown" :on-mouseup="onMouseup">
        <img :src="car" alt="">
      </MeMarker>
    </MeScene>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import MeScene from './me-map-l7/components/scene/src/scene.vue';
import MePointLayer from './me-map-l7/components/point-layer';
import MeSource from './me-map-l7/components/source/src/source.vue';
import MeMapPopup from './me-map-l7/components/popup/src/popup.vue';
import MeMarker from './me-map-l7/components/marker/src/marker.vue';
import { LayerOptions } from './me-map-l7/types/layer';
import car from '../public/car.png';
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
const show = ref(false);
const longitude = ref(0);
const latitude = ref(0)
const showMarker = ref(false)
const layerConfig = ref<LayerOptions>({
  id : 'aa',
  color : '#f00',
  shape : 'circle',
  size : 30,
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
const isDraggable = ref(false);
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
}
const clickLineLayer = (evt: any) => {
  longitude.value = evt.lngLat.lng;
  latitude.value = evt.lngLat.lat;
  setTimeout(() => {
    show.value = true;
  })
}
const onClose = () => {
  show.value = false;
}
const onMousedown = (evt: any) => {
  isDraggable.value = true;
}
const onMouseup = () => {
  isDraggable.value = false;
}
const clickMap = (evt: any) => {
  showMarker.value = true;
  longitude.value = evt.lngLat.lng;
  latitude.value = evt.lngLat.lat;
}
const onMousemove = (evt: any) => {
  if (isDraggable.value) {
    longitude.value = evt.lngLat.lng;
    latitude.value = evt.lngLat.lat;
  }
}
</script>
<style scoped>
.map {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
