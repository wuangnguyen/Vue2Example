export const healthCareRoute = {
  path: '/health-care',
  component: () => import('@/layouts/MainLayout'),
  meta: { title: 'Quản lý sức khỏe' },
  children: [
    {
      name: 'HealthCare',
      path: '/health-care',
      components: {
        default: () => import('./HealthCare'),
        subHeader: () => import('@/components/SubHeader/SubHeader')
      }
    }
  ]
};
