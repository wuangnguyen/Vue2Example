import Vue from 'vue';
import VueRouter from 'vue-router';
import { productRoute } from '@/pages/product/product-route';
import { paymentHistoryRoute } from '@/pages/payment-history/payment-history-route';
Vue.use(VueRouter);

var routes = [
  {
    path: '/',
    redirect: '/product'
  }
];
routes.push(productRoute, paymentHistoryRoute);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;

router.beforeEach((to, from, next) => {
  let matchedRecord = to.matched.find(record => record.meta.title);
  document.title = matchedRecord.meta.title;
  next();
});
