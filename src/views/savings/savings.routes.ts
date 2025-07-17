import type { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
  name: 'SavingsDashboard',
  path: 'savings',
  meta: { layout: 'DashboardLayout', requiresAuth: true },
  component: () => import('./SavingsView.vue'),
}
