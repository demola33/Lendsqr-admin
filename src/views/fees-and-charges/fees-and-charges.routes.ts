import type { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
  name: 'FeesAndChargesDashboard',
  path: 'fees-and-charges',
  meta: { layout: 'DashboardLayout', requiresAuth: true },
  component: () => import('./FeesAndChargesView.vue'),
}
