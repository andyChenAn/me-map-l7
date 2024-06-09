<template>
  <button @click="onClick">click</button>
  <button @click="changeColor">修改颜色</button>
  <div id="map" class="map">
    <MeScene ref="sceneRef" v-bind="mapConfig">
      <MeLayer v-for="item in layerList" :key="item.layerConfig.id" v-bind="item.layerConfig" :on-click="clickLineLayer">
        <MeSource v-bind="item.source" />
      </MeLayer>
    </MeScene>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import MeScene from './me-map-l7/components/scene/src/scene.vue';
import MeLayer from './me-map-l7/components/layer/src/layer.vue';
import MeSource from './me-map-l7/components/source/src/source.vue';
import { LayerOptions } from './me-map-l7/types/layer';
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
const layerConfig = ref<LayerOptions>({
  id : 'aa',
  type : 'polygon',
  shape : 'fill',
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
          type : "Polygon",
          coordinates : [
            [
              [113.4514 , 23.6545],
              [113.4534 , 23.6345],
              [113.4234 , 23.6315]
            ]
          ]
        }
      }
    ]
  }
})
const layerList = ref([
  {
    layerConfig : {
      id : 'aa',
      type : 'polygon',
      shape : 'fill',
      color : '#f00',
      active : {
        color : '#000',
        mix : 0.5
      }
    },
    source : {
      type : 'FeatureCollection',
      features : [
        {
          type : 'Feature',
          properties : {},
          geometry : {
            type : "Polygon",
            coordinates : [
              [
                [113.4514 , 23.6545],
                [113.4534 , 23.6345],
                [113.4234 , 23.6315]
              ]
            ]
          }
        }
      ]
    }
  },
  {
    layerConfig : {
      id : 'b',
      type : 'line',
      shape : 'line',
      size : 10,
      color : '#ff0',
      active : {
        color : '#000',
        mix : 0.5
      }
    },
    source : {
      type : 'FeatureCollection',
      features : [
        {
          type : "Feature",
          properties : {},
          geometry : {
            type : 'LineString',
            coordinates : [
              [113.4514 , 23.6545],
              [113.4534 , 23.6345],
              [113.4234 , 23.6315]
            ]
          }
        }
      ]
    }
  },
  {
    layerConfig : {
      id : 'c',
      size : 20,
      type : 'point',
      shape : 'car',
      icon : {
        name : 'car',
        url : 'http://localhost:5173/car.png'
      },
      active : {
        color : '#000',
        mix : 0.5
      }
    },
    source : {
      type : 'FeatureCollection',
      features : [
        {
          type : 'Feature',
          properties : {},
          geometry : {
            type : 'Point',
            coordinates : [113.4514 , 23.6545]
          }
        }
      ]
    }
  }
])
const sceneRef = ref();
const onClick = () => {
  
}
onMounted(() => {
})
const changeColor = () => {
  layerConfig.value.shape = 'water';
  layerConfig.value.color = '#000'
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
