import Vue from 'vue';
import App from './App.vue';
import createVuetify from './plugins/vuetify';
import router from './router';
import 'vuetify/dist/vuetify.min.css';
import store from './store';
import i18n from './i18n'

Vue.config.productionTip = false;

const vuetify = createVuetify(store.state.isDarkMode, store.state.currentUserLanguage);

new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');

