import type { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
  name: 'FeesAndPricingDashboard',
  path: 'fees-and-pricing',
  meta: { layout: 'DashboardLayout', requiresAuth: true },
  component: () => import('./FeesAndPricingView.vue'),
}
