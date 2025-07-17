import type { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
  name: 'SavingsProductsDashboard',
  path: 'savings-products',
  meta: { layout: 'DashboardLayout', requiresAuth: true },
  component: () => import('./SavingsProductsView.vue'),
}
