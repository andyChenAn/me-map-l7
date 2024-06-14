<template>
  <div id="map" class="map">
    <button @click="onAdd">添加</button>
    <button @click="onAdd2">添加2</button>
    <button @click="onAdd3">添加3</button>
    <button @click="onAdd4">添加4</button>
    <button @click="onAdd5">添加5</button>
    <button @click="onAdd6">添加6</button>
    <button @click="onAdd7">添加7</button>
    <button @click="onAdd8">添加8</button>
    <button @click="onAdd9">添加9</button>
    <button @click="drawPoint">画点</button>
    <button @click="onChange">修改</button>
    <button @click="onDelete">删除</button>
    <me-scene ref="sceneRef" v-bind="mapConfig" :on-click="onClick">
      <me-source v-for="item in sourceList" :key="item.id" v-bind="item.source">
        <me-layer v-bind="item.layer" />
      </me-source>
      <me-source v-bind="cluster.source">
        <me-cluster-layer v-bind="cluster.layer" />
      </me-source>
      <me-marker v-if="showMarker" v-bind="markerConfig" :on-click="clickMarker">
        <div>hello andy</div>
      </me-marker>
      <me-popup
        v-if="showPopup"
        v-bind="popupConfig"
      >
        <div>hello andy</div>
      </me-popup>
    </me-scene>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { ClusterLayerProps } from './me-map-l7/components/cluster-layer/src/cluster-layer.vue';
import { MarkerOptions, PopupOptions } from './me-map-l7';
const mapConfig = ref({
  center: [121.168, 30.2828],
  zoom: 14.89,
  minZoom: 0,
  container : 'map',
  maxZoom: 18,
  reuse : true,
  mapStyle : 'mapbox://styles/mapbox/streets-v11',
  accessToken : 'pk.eyJ1IjoiZXRlcm5pdHkteHlmIiwiYSI6ImNqaDFsdXIxdTA1ODgycXJ5czdjNmF0ZTkifQ.zN7e588TqZOQMWfws-K0Yw',
});
const markerConfig = ref<MarkerOptions>({
  longitude : 0,
  latitude : 0
});
const popupConfig = ref<PopupOptions>({
  longitude : 0,
  latitude : 0
})
const cluster = ref({
  source : {
    data : '',
    options : {
      parser : {
        type : 'csv',
        x : 'lng',
        y : 'lat'
      },
      cluster : true
    }
  },
  layer : {
    id : 'cluster',
    circle : {
      size : {
        type : 'point_count',
        callback : [5, 10, 15, 20, 25]
      },
      scale : {
        type : 'point_count',
        callback : {
          type : 'quantile'
        }
      },
      active : true,
      color : 'rgb(73,167,86)',
      style : {
        strokeWidth: 1,
        stroke: '#fff',
      }
    },
    text : {
      size : 15,
      active : true,
      color : '#fff',
      style : {
        strokeWidth: 0,
        stroke: '#fff',
      }
    }
  } as ClusterLayerProps
})
const sceneRef = ref();
const showPopup = ref(false);
const showMarker = ref(false);
const sourceList = ref<any[]>([])
const drawPoint = () => {
  const draw = sceneRef.value.getDraw();
}
const onDelete = () => {
  sourceList.value = [];
}
const onClick = (evt: any) => {
  markerConfig.value.longitude = evt.lngLat.lng;
  markerConfig.value.latitude = evt.lngLat.lat;
  showMarker.value = true;
}
const clickMarker = (evt: any) => {
  // 记得加上阻止向上冒泡
  evt.target.stopPropagation();
  popupConfig.value.longitude = evt.lngLat.lng;
  popupConfig.value.latitude = evt.lngLat.lat;
  showPopup.value = true;
}
const onAdd = () => {
  fetch('https://gw.alipayobjects.com/os/basement_prod/893d1d5f-11d9-45f3-8322-ee9140d288ae.json')
  .then((res) => res.json())
  .then(data => {
    const aa = data;
    const sourceData = {
      data : data,
      options : {
        parser : {
          type : 'json',
          x : 'longitude',
          y : 'latitude'
        }
      }
    }
    sourceList.value.push({
      id : Math.random().toString(16),
      source : sourceData,
      layer : {
        id : 'aa',
        type : 'point',
        shape : 'circle',
        size : {
          type : 'unit_price',
          callback : [10 , 25]
        },
        active : true,
        color : {
          type : 'name',
          callback : ['#5B8FF9', '#5CCEA1', '#5D7092', '#F6BD16', '#E86452']
        },
        style : {
          opacity: 0.3,
          strokeWidth: 2,
        }
      }
    })
    // setTimeout(() => {
    //   sourceList.value[0].source.data = aa.slice(0 , 20);
    // } , 1000)
    // sourceConfig.value.data = data;
  })
}
const onAdd2 = () => {
  fetch('https://gw.alipayobjects.com/os/basement_prod/d3564b06-670f-46ea-8edb-842f7010a7c6.json')
  .then((res) => res.json())
  .then(data => {
    sourceList.value.push({
      id : Math.random().toString(16),
      source : {
        data : data
      },
      layer : {
        id : 'bb',
        type : 'point',
        shape : 'circle',
        size : {
          type : 'mag',
          callback : [1 , 25]
        },
        color : {
          type : 'mag',
          callback (mag: number) {
            return mag > 4.5 ? '#5B8FF9' : '#5CCEA1';
          }
        },
        active : true
      }
    })
  })
}
const onAdd3 = () => {
  fetch('https://gw.alipayobjects.com/os/basement_prod/513add53-dcb2-4295-8860-9e7aa5236699.json')
  .then(res => res.json())
  .then(data => {
    sourceList.value.push({
      id : Math.random().toString(16),
      source : {
        data : data
      },
      layer : {
        id : 'cc',
        type : 'point',
        size : 2,
        color : {
          type : 'h8',
          callback : [
            '#0A3663',
            '#1558AC',
            '#3771D9',
            '#4D89E5',
            '#64A5D3',
            '#72BED6',
            '#83CED6',
            '#A6E1E0',
            '#B8EFE2',
            '#D7F9F0'
          ]
        }
      }
    })
  })
}
const onAdd4 = () => {
  fetch('https://gw.alipayobjects.com/os/bmw-prod/0290a972-eedd-42f6-b69e-50a35e8a0824.json')
  .then((res) => res.json())
  .then(data => {
    sourceList.value.push({
      id : Math.random().toString(16),
      source : {
        data : data,
        options : {
          parser : {
            type : 'json',
            coordinates : 'coordinates'
          }
        }
      },
      layer : {
        size : 0.5,
        type : 'line',
        shape : 'line',
        acitve : true,
        color : {
          type : 'length',
          callback : [
          '#0A3663',
          '#1558AC',
          '#3771D9',
          '#4D89E5',
          '#64A5D3',
          '#72BED6',
          '#83CED6',
          '#A6E1E0',
          '#B8EFE2',
          '#D7F9F0',
          ]
        }
      }
    })
  })
}
const onAdd5 = () => {
  fetch('https://gw.alipayobjects.com/os/basement_prod/972566c5-a2b9-4a7e-8da1-bae9d0eb0117.json')
  .then((res) => res.json())
  .then(data => {
    sourceList.value.push({
      id : Math.random().toString(16),
      source : {
        data : data
      },
      layer : {
        id : 'sdfs',
        type : 'polygon',
        shape : 'fill',
        size : {
          type : 'h20',
          callback : [100, 120, 160, 200, 260, 500]
        },
        color : {
          type : 'h20',
          callback : [
            '#816CAD',
            '#A67FB5',
            '#C997C7',
            '#DEB8D4',
            '#F5D4E6',
            '#FAE4F1',
            '#FFF3FC',
          ]
        }
      }
    })
  })
}
const onAdd6 = () => {
  fetch('https://gw.alipayobjects.com/os/basement_prod/d3564b06-670f-46ea-8edb-842f7010a7c6.json')
  .then((res) => res.json())
  .then(data => {
    sourceList.value.push({
      id : Math.random().toString(16),
      source : {
        data : data
      },
      layer : {
        id : 'fghd',
        type : 'heatmap',
        shape : 'heatmap',
        size : {
          type : 'mag',
          callback : [0 , 1]
        },
        style : {
          intensity: 2,
          radius: 20,
          rampColors: {
            colors: ['#FF4818', '#F7B74A', '#FFF598', '#91EABC', '#2EA9A1', '#206C7C'].reverse(),
            positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
          },
        }
      }
    })
  })
}
const onAdd7 = () => {
  fetch('https://gw.alipayobjects.com/os/bmw-prod/87e40417-a5da-4fdb-8313-c796ea15f982.csv')
  .then((res) => res.text())
  .then(data => {
    cluster.value.source.data = data;
  })
}
const onAdd8 = () => {
  fetch('https://gw.alipayobjects.com/os/bmw-prod/93a55259-328e-4e8b-8dc2-35e05844ed31.json')
  .then((res) => res.json())
  .then(data => {
    sourceList.value.push({
      id : Math.random().toString(16),
      source : {
        data : data
      },
      layer : {
        id : 'fghdfh',
        type : 'line',
        shape : 'wall',
        size : 40,
        style : {
          opacity: 1,
          sourceColor: '#0DCCFF',
          targetColor: 'rbga(255,255,255, 0)',
        }
      }
    })
  })
}
const onAdd9 = () => {
  sourceList.value.push({
    id : Math.random().toString(16),
    source : {
      data : 'https://gw.alipayobjects.com/zos/rmsportal/FnHFeFklTzKDdUESRNDv.jpg',
      options : {
        parser : {
          type: 'image',
          extent: [121.168, 30.2828, 121.384, 30.4219],
        }
      }
    },
    layer : {
      id : 'rety',
      type : 'image',
      shape : 'image'
    }
  })
}
const onChange = () => {
  // sourceList.value[0].layer.shape = 'circle';
  // cluster.value.layer.circle = Object.assign(cluster.value.layer.circle , {
  //   color : '#f00'
  // })
  // cluster.value.layer.circle.color = '#ff0'
  sourceList.value[sourceList.value.length - 1].layer.style = {
    sourceColor : '#f00',
    targetColor : '#ff0'
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
