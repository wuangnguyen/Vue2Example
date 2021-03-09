import Vue from 'vue';
import router from './router';
import vuetify from './plugins/vuetify';
import filters from './filters';
import VueToast from 'vue-toast-notification';
import DatetimePicker from 'vuetify-datetime-picker';
import 'vue-toast-notification/dist/theme-default.css';
import '@/assets/styles/main.scss';

Vue.config.productionTip = false;

Vue.use(VueToast, {
  duration: 5000,
  position: 'top-right'
});

Date.prototype.toJSON = function() {
  const hoursDiff = this.getHours() - this.getTimezoneOffset() / 60;
  this.setHours(hoursDiff);
  return this.toISOString();
};
Vue.use(DatetimePicker);

new Vue({
  router,
  vuetify,
  filters,
  render: function(createElement) {
    return createElement('router-view', this.$slots.default);
  }
}).$mount('#app');
