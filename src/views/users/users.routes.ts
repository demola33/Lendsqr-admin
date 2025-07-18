import type { RouteRecordRaw } from 'vue-router'
import IDRoutes from './[id]/[id].routes'

export default <RouteRecordRaw>{
  name: 'Users',
  path: 'users',
  meta: { layout: 'DashboardLayout', requiresAuth: true },
  children: [
    {
      path: '',
      name: 'UsersDashboard',
      component: () => import('./UsersView.vue'),
    },
    IDRoutes,
  ],
}
