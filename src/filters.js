import Vue from 'vue';
import { toVnFormat } from '@/helpers/date-helper';
Vue.filter('currency', function(value) {
  if (!value || value == 0) {
    return '0 ₫';
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
