import MeLayer from './src/layer.vue';
MeLayer.name = 'me-layer';
MeLayer.install = (app: any) => {
  app.component(MeLayer.name , MeLayer);
}
export default MeLayer;