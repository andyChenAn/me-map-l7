import MePointLayer from './src/point-layer.vue';
MePointLayer.name = 'me-point-layer';
MePointLayer.install = (app: any) => {
  app.component(MePointLayer.name , MePointLayer);
}
export default MePointLayer;