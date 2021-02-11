import Vue from 'vue';
import router from './router';
import vuetify from './plugins/vuetify';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
import '@/assets/styles/main.scss';

Vue.config.productionTip = false;

Vue.use(VueToast, {
  duration: 5000,
  position: 'top-right'
});

Vue.prototype.$eventBus = new Vue();

new Vue({
  router,
  vuetify,
  render: function(createElement) {
    return createElement('router-view', this.$slots.default);
  }
}).$mount('#app');
