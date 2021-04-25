import Vue from 'vue';
import VueRouter from 'vue-router';
import { productRoute } from '@/pages/product/product-route';
import { paymentHistoryRoute } from '@/pages/payment-history/payment-history-route';
import { healthCareRoute } from '@/pages/health-care/health-care-route';
import { userRoute } from '@/pages/user/user-route';
import { taskRoute } from '@/pages/task/task-route';
import { loginRoute, changePasswordRoute } from '@/pages/account/account-route';
import identity from '@/helpers/identity-helper';

Vue.use(VueRouter);

var routes = [
  {
    path: '/',
    redirect: '/product'
  }
];
routes.push(productRoute, paymentHistoryRoute, healthCareRoute, userRoute, taskRoute, loginRoute, changePasswordRoute);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
router.beforeEach((to, from, next) => {
  let matchedRecord = to.matched.find(record => record.meta.title);
  document.title = matchedRecord.meta.title;
  if (to.matched.some(record => record.meta.authRequired)) {
    if (!identity.isAuthenticated()) {
      next({
        path: '/login'
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
