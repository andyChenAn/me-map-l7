<template>
  <slot />
</template>
<script lang="ts" setup>
import { PopupOptions } from '../../../types/popup';
import { getCurrentInstance, inject, onBeforeUnmount, onMounted, ref, toRaw, watch } from 'vue';
import MeScene from '../../../core/scene';
import { Popup } from '@antv/l7';
import equal from '../../../utils/equal';
import { omit } from 'lodash-es'
const props = withDefaults(defineProps<PopupOptions>() , {
  closeOnClick : true,
  closeOnEsc : false,
  maxWidth : '240px',
  anchor : 'bottom',
  offsets () {
    return [0 , 0];
  },
  autoPan : false,
  autoClose : true,
  followCursor : false,
  closeButton : false,
  stopPropagation : true
});
// 获取当前组件实例
const instance = getCurrentInstance();
const mapScene = ref(inject<MeScene>('mapScene'));
let oldProps: PopupOptions = {};
let popup: Popup;
const popupEvents = {
  open : 'onOpen',
  close : 'onClose',
  show : 'onShow',
  hide : 'onHide'
}
const createPopup = () => {
  const { longitude , latitude } = toRaw(props);
  const scene = mapScene.value?.getScene();
  popup = new Popup({
    lngLat : {
      lng : longitude!,
      lat : latitude!
    },
    ...omit(toRaw(props) , ['longitude' , 'latitude' , 'onClose' , 'onOpen' , 'onShow' , 'onHide'])
  });
  const el = instance?.vnode.el!.nextElementSibling;
  if (el) {
    popup.setHTML(el);
  }
  scene?.addPopup(popup);
  oldProps = JSON.parse(JSON.stringify(props));
  bindEvents();
}
const bindEvents = () => {
  for (let eventName in popupEvents) {
    const handler = props[popupEvents[eventName as keyof typeof popupEvents] as keyof typeof props] as () => void;
    if (handler) {
      popup.on(eventName , handler);
    }
  }
}
const unbindEvents = () => {
  for (let eventName in popupEvents) {
    const handler = props[popupEvents[eventName as keyof typeof popupEvents] as keyof typeof props] as () => void;
    if (handler) {
      popup.off(eventName , handler);
    }
  }
}
const updatePopup = (newProps: PopupOptions , oldProps: PopupOptions) => {
  if (popup) {
    const { text , title , html , longitude , latitude } = newProps;
    if (!equal(text , oldProps.text)) {
      popup.setText(text!);
    }
    if (!equal(title , oldProps.title)) {
      popup.setTitle(title);
    }
    if (!equal(html , oldProps.html)) {
      popup.setHTML(html!);
    }
    if (!equal(longitude , oldProps.longitude) || !equal(latitude , oldProps.latitude)) {
      popup.setLngLat({lng : longitude! , lat : latitude!});
    }
  }
}
const removePopup = () => {
  if (mapScene.value && popup) {
    const scene = mapScene.value.getScene();
    scene.removePopup(popup)
  }
}
watch(props , () => {
  updatePopup(toRaw(props) , toRaw(oldProps));
})
onMounted(() => {
  createPopup();
})
onBeforeUnmount(() => {
  unbindEvents();
  removePopup();
})
</script>
<style lang="less" scoped></style>