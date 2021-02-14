import Vue from 'vue';

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
  if (!date) return null;

  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
});

export default {};
