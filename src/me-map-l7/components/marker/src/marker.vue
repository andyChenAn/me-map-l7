<template>
  <div ref="markerRef">
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { ref , inject , onMounted , onBeforeUnmount, nextTick, watch, toRaw } from 'vue';
import { MarkerOptions } from '../../../types/marker';
import { anchorType , Marker } from '@antv/l7';
import MeScene from '../../../core/scene';
import equal from '../../../utils/equal';
const props = withDefaults(defineProps<MarkerOptions>() , {
  offsets () {
    return [0 , 0]
  },
  draggable : false,
  anchor : 'center'
});
const markerRef = ref();
let marker: Marker;
const mapScene = ref(inject<MeScene>('mapScene'));
let oldProps: MarkerOptions = {};
const markerEvents = {
  click : 'onClick',
  mousemove : 'onMousemove',
  mousedown : 'onMousedown',
  mouseup : 'onMouseup',
  dblclick : 'onDblclick',
  contextmenu : 'onContextmenu',
  mouseover : 'onMouseover',
  mouseout : 'onMouseout',
  dragstart : 'onDragstart',
  dragging : 'onDragging',
  dragend : 'onDragend'
}
const createMarker = () => {
  nextTick(() => {
    const { longitude , latitude , offsets , anchor , draggable ,extData } = toRaw(props);
    const el = markerRef.value.children[0];
    if (el) {
      const scene = mapScene.value?.getScene();
      marker = new Marker({
        offsets,
        anchor : anchor as anchorType,
        draggable,
        extData,
        element: el
      });
      marker.setLnglat({lng : longitude! , lat : latitude!});
      scene?.addMarker(marker);
      bindEvents();
    }
    oldProps = JSON.parse(JSON.stringify(toRaw(props)));
  })
}
const updateMarker = () => {
  const { longitude , latitude , draggable } = toRaw(props);
  if (!equal(longitude , oldProps.longitude) || !equal(latitude , oldProps.latitude)) {
    marker.setLnglat({lng : longitude! , lat : latitude!});
  };
  if (!equal(draggable , oldProps.draggable)) {
    marker.setDraggable(draggable!);
  }
  oldProps = JSON.parse(JSON.stringify(props));
}
const bindEvents = () => {
  for (let eventName in markerEvents) {
    const handler = props[markerEvents[eventName as keyof typeof markerEvents] as keyof typeof props] as () => void;
    if (handler) {
      marker.on(eventName , handler);
    }
  }
}
const unbindEvents = () => {
  for (let eventName in markerEvents) {
    const handler = props[markerEvents[eventName as keyof typeof markerEvents] as keyof typeof props] as () => void;
    if (handler) {
      marker.off(eventName , handler);
    }
  }
}
const removeMarker = () => {
  if (marker) {
    marker.remove();
  }
}
watch(props , () => {
  updateMarker();
})
onMounted(() => {
  createMarker();
})
onBeforeUnmount(() => {
  unbindEvents();
  removeMarker();
})
</script>
<style lang="less" scoped></style>