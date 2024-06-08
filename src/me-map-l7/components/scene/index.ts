import Scene from './src/scene.vue';
Scene.name = 'me-map';
Scene.install = (app: any) => {
  app.component(Scene.name , Scene);
}
export default Scene;