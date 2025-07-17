import type { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
  name: 'ServicesDashboard',
  path: 'services',
  meta: { layout: 'DashboardLayout', requiresAuth: true },
  component: () => import('./ServicesView.vue'),
}
