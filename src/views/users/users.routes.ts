import type { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
  name: 'UsersDashboard',
  path: 'users',
  meta: { layout: 'DashboardLayout', requiresAuth: true },
  component: () => import('./UsersView.vue'),
}
