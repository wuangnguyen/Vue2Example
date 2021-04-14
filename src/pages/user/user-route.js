export const userRoute = {
  path: '/user',
  component: () => import('@/layouts/MainLayout'),
  meta: { title: 'Quản lý chúng chùa' },
  children: [
    {
      name: 'User',
      path: '/user',
      components: {
        default: () => import('./User'),
        subHeader: () => import('@/components/SubHeader/SubHeader')
      }
    }
  ]
};
