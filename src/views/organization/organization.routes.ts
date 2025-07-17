import type { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
  name: 'OrganizationDashboard',
  path: 'organization',
  meta: { layout: 'DashboardLayout', requiresAuth: true },
  component: () => import('./OrganizationView.vue'),
}
