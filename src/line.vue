<template>
  <button @click="onClick">click</button>
  <button @click="changeColor">修改颜色</button>
  <div id="map" class="map">
    <MeScene ref="sceneRef" v-bind="mapConfig">
      <MeLineLayer v-bind="layerConfig" :on-click="clickLineLayer">
        <MeSource v-bind="sourceConfig.source" />
      </MeLineLayer>
    </MeScene>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import MeScene from './me-map-l7/components/scene/src/scene.vue';
import MeLineLayer from './me-map-l7/components/line-layer/src/line-layer.vue';
import MeSource from './me-map-l7/components/source/src/source.vue';
import { PointLayerOptions } from './me-map-l7/types/layer';
const mapConfig = ref({
  center : [113.4534 , 23.6545],
  zoom: 10,
  minZoom: 0,
  container : 'map',
  maxZoom: 18,
  reuse : true,
  mapStyle : 'mapbox://styles/mapbox/streets-v11',
  accessToken : 'pk.eyJ1IjoiZXRlcm5pdHkteHlmIiwiYSI6ImNqaDFsdXIxdTA1ODgycXJ5czdjNmF0ZTkifQ.zN7e588TqZOQMWfws-K0Yw',
});
const layerConfig = ref<PointLayerOptions>({
  id : 'aa',
  size : 7,
  shape : 'line',
  color : '#f00',
  active : {
    color : '#000',
    mix : 0.5
  }
})
const sourceConfig = ref({
  source : {
    type : 'FeatureCollection',
    features : [
      {
        type : 'Feature',
        properties : {},
        geometry : {
          type : "LineString",
          coordinates : [
            [113.4534 , 23.6545],
            [113.4514 , 23.6545],
            [113.4534 , 23.6345]
          ]
        }
      }
    ]
  }
})
const sceneRef = ref();
const onClick = () => {
  sourceConfig.value.source.features[0].geometry.coordinates.push([113.4234 , 23.6445])
  // sourceConfig.value.source.features.push({
  //   type : 'Feature',
  //   properties : {},
  //   geometry : {
  //     type : 'Point',
  //     coordinates : [113.4234 , 23.6445]
  //   }
  // })
  // mapConfig.value.mapStyle = 'mapbox://styles/mapbox/dark-v11'
  // mapConfig.value.center = [113.4323 , 23.4325]
}
onMounted(() => {
  // console.log(sceneRef.value.getMap() , sceneRef.value.getScene())
})
const changeColor = () => {
  // layerConfig.value.color = `rgb(${Math.floor(Math.random() * 255)} , ${Math.floor(Math.random() * 255)} , ${Math.floor(Math.random() * 255)})`;
  // layerConfig.value.shape = 'circle';
  layerConfig.value.shape = 'arc';
  layerConfig.value.color = '#ff0'
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
