import type { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
  name: 'GuarantorsDashboard',
  path: 'guarantors',
  meta: { layout: 'DashboardLayout', requiresAuth: true },
  component: () => import('./GuarantorsView.vue'),
}
