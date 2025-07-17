import type { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
  name: 'ReportsDashboard',
  path: 'reports',
  meta: { layout: 'DashboardLayout', requiresAuth: true },
  component: () => import('./ReportsView.vue'),
}
