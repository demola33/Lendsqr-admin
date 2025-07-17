import type { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
  name: 'LoanProductsDashboard',
  path: 'loan-products',
  meta: { layout: 'DashboardLayout', requiresAuth: true },
  component: () => import('./LoanProductsView.vue'),
}
