import type { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
  name: 'LoansDashboard',
  path: 'loans',
  meta: { layout: 'DashboardLayout', requiresAuth: true },
  component: () => import('./LoansView.vue'),
}
