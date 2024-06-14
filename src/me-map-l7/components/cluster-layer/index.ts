import MeClusterlayer , { ClusterLayerProps } from './src/cluster-layer.vue';
MeClusterlayer.name = 'me-cluster-layer';
MeClusterlayer.install = (app: any) => {
  app.component(MeClusterlayer.name , MeClusterlayer);
}
export type {
  ClusterLayerProps
}
export default MeClusterlayer;