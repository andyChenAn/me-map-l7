import MeLineLayer from './src/line-layer.vue';
MeLineLayer.name = 'me-line-layer';
MeLineLayer.install = (app: any) => {
  app.component(MeLineLayer.name , MeLineLayer);
}
export default MeLineLayer;