import MePolygonLayer from './src/polygon-layer.vue';
MePolygonLayer.name = 'me-polygon-layer';
MePolygonLayer.install = (app: any) => {
  app.component(MePolygonLayer.name , MePolygonLayer);
}
export default MePolygonLayer;