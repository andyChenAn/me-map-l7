import MePopup from './src/popup.vue';
MePopup.name = 'me-popup';
MePopup.intall = (app: any) => {
  app.component(MePopup.name , MePopup);
}
export default MePopup;