import type { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
  name: 'SettlementsDashboard',
  path: 'settlements',
  meta: { layout: 'DashboardLayout', requiresAuth: true },
  component: () => import('./SettlementsView.vue'),
}
