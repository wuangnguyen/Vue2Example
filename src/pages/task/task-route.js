export const taskRoute = {
  path: '/task',
  component: () => import('@/layouts/MainLayout'),
  meta: { title: 'Quản lý danh mục công việc' },
  children: [
    {
      name: 'Task',
      path: '/task',
      components: {
        default: () => import('./Task'),
        subHeader: () => import('@/components/SubHeader/SubHeader')
      }
    }
  ]
};
