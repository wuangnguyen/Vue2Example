export const loginRoute = {
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
export const changePasswordRoute = {
  path: '/change-password',
  component: () => import('@/layouts/EmptyLayout'),
  meta: { title: 'Đổi mật khẩu' },
  children: [
    {
      name: 'ChangePassword',
      path: '/change-password',
      component: () => import('./ChangePassword')
    }
  ]
};
