import type { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
  name: 'LoanRequestsDashboard',
  path: 'loan-requests',
  meta: { layout: 'DashboardLayout', requiresAuth: true },
  component: () => import('./LoanRequestsView.vue'),
}
