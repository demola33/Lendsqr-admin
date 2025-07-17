import type { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
  name: 'WhiteListDashboard',
  path: 'white-list',
  meta: { layout: 'DashboardLayout', requiresAuth: true },
  component: () => import('./WhiteListView.vue'),
}
