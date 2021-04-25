export const paymentHistoryRoute = {
  path: '/payment-history',
  component: () => import('@/layouts/MainLayout'),
  meta: { title: 'Quản lý thu chi', authRequired: true },
  children: [
    {
      name: 'PaymentHistory',
      path: '/payment-history',
      components: {
        default: () => import('./PaymentHistory'),
        subHeader: () => import('@/components/SubHeader/SubHeader')
      }
    }
  ]
};
