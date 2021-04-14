export const accountRoute = {
  path: '/login',
  component: () => import('@/layouts/EmptyLayout'),
  meta: { title: 'Đăng nhập' },
  children: [
    {
      name: 'Login',
      path: '/login',
      component: () => import('./Login')
    }
  ]
};
