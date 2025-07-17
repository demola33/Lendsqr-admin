import type { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
  name: 'ServiceAccountDashboard',
  path: 'service-account',
  meta: { layout: 'DashboardLayout', requiresAuth: true },
  component: () => import('./ServiceAccountView.vue'),
}
