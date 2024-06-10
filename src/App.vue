<template>
  <button>click</button>
  <button>修改颜色</button>
  <div id="map" class="map">
    <MeScene ref="sceneRef" v-bind="mapConfig">

    </MeScene>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import MeScene from './me-map-l7/components/scene/src/scene.vue';

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
</script>
<style scoped>
.map {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
