import MeHeatmapLayer from './src/heatmap-layer.vue';
MeHeatmapLayer.name = 'me-heatmap-layer';
MeHeatmapLayer.install = (app: any) => {
  app.component(MeHeatmapLayer.name , MeHeatmapLayer);
}
export default MeHeatmapLayer;