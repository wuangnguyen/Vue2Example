import Vue from 'vue';
import firebase from 'firebase/app';
import router from './router';
import vuetify from './plugins/vuetify';
import filters from './filters';
import VueToast from 'vue-toast-notification';
import DatetimePicker from 'vuetify-datetime-picker';
import 'vue-toast-notification/dist/theme-default.css';
import '@/assets/styles/main.scss';

Vue.config.productionTip = false;

var firebaseConfig = {
  apiKey: 'AIzaSyA3L7ujPPvqXGsont6P6mtoa4dMrK2qRKM',
  authDomain: 'chuathienphuoc-q1.firebaseapp.com',
  projectId: 'chuathienphuoc-q1',
  storageBucket: 'chuathienphuoc-q1.appspot.com',
  messagingSenderId: '718340589155',
  appId: '1:718340589155:web:6eb0937d3b819a09a51a56'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

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
