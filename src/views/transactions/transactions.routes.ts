import type { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
  name: 'TransactionsDashboard',
  path: 'transactions',
  meta: { layout: 'DashboardLayout', requiresAuth: true },
  component: () => import('./TransactionsView.vue'),
}
