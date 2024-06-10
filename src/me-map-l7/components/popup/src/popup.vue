<template>
  <slot />
</template>
<script lang="ts" setup>
import { PopupOptions } from '../../../types/popup';
import { getCurrentInstance, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue';
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
const popup = ref<Popup>();
const popupEvents = {
  open : 'onOpen',
  close : 'onClose',
  show : 'onShow',
  hide : 'onHide'
}
const createPopup = () => {
  const { longitude , latitude } = props;
  const scene = mapScene.value?.getScene();
  popup.value = new Popup({
    lngLat : {
      lng : longitude!,
      lat : latitude!
    },
    ...omit(props , ['longitude' , 'latitude' , 'onClose' , 'onOpen' , 'onShow' , 'onHide'])
  });
  const el = instance?.vnode.el!.nextElementSibling;
  if (el) {
    popup.value.setHTML(el);
  }
  scene?.addPopup(popup.value);
  oldProps = JSON.parse(JSON.stringify(props));
  bindEvents();
}
const bindEvents = () => {
  for (let eventName in popupEvents) {
    const handler = props[popupEvents[eventName as keyof typeof popupEvents] as keyof typeof props] as () => void;
    if (handler) {
      popup.value?.on(eventName , handler);
    }
  }
}
const unbindEvents = () => {
  for (let eventName in popupEvents) {
    const handler = props[popupEvents[eventName as keyof typeof popupEvents] as keyof typeof props] as () => void;
    if (handler) {
      popup.value?.off(eventName , handler);
    }
  }
}
const updatePopup = (newProps: PopupOptions , oldProps: PopupOptions) => {
  if (popup.value) {
    const { text , title , html , longitude , latitude } = newProps;
    if (!equal(text , oldProps.text)) {
      popup.value.setText(text!);
    }
    if (!equal(title , oldProps.title)) {
      popup.value.setTitle(title);
    }
    if (!equal(html , oldProps.html)) {
      popup.value.setHTML(html!);
    }
    if (!equal(longitude , oldProps.longitude) || !equal(latitude , oldProps.latitude)) {
      popup.value.setLngLat({lng : longitude! , lat : latitude!});
    }
  }
}
const removePopup = () => {
  if (mapScene.value && popup.value) {
    const scene = mapScene.value.getScene();
    scene.removePopup(popup.value)
  }
}
watch(props , () => {
  console.log(23423)
  updatePopup(props , oldProps);
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