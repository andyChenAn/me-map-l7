import MeScene from './src/scene.vue';
MeScene.name = 'me-scene';
MeScene.install = (app: any) => {
  app.component(MeScene.name , MeScene);
}
export default MeScene;