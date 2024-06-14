import MeMarker from './src/marker.vue';
MeMarker.name = 'me-marker';
MeMarker.install = (app: any) => {
  app.component(MeMarker.name , MeMarker);
}
export default MeMarker;