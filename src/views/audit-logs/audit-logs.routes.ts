import type { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
  name: 'AuditLogsDashboard',
  path: 'audit-logs',
  meta: { layout: 'DashboardLayout', requiresAuth: true },
  component: () => import('./AuditLogsView.vue'),
}
