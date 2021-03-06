export const productRoute = {
  path: '/product',
  component: () => import('@/layouts/MainLayout'),
  meta: { title: 'Quản lý sản phẩm', authRequired: true },
  children: [
    {
      name: 'Product',
      path: '/product',
      components: {
        default: () => import('./Product'),
        subHeader: () => import('@/components/SubHeader/SubHeader')
      }
    }
  ]
};
