import Vue from 'vue';
import { toVnFormat } from '@/helpers/date-helper';
Vue.filter('currency', function(value) {
  if (!value) {
    return '';
  }
  let formatter = new Intl.NumberFormat('vi', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  });
  return formatter.format(value);
});

Vue.filter('date', function(date) {
  return toVnFormat(date);
});

export default {};
