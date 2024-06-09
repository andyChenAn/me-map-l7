import MeSource from './src/source.vue';
MeSource.name = 'me-source';
MeSource.install = (app: any) => {
  app.component(MeSource.name , MeSource);
}
export default MeSource;