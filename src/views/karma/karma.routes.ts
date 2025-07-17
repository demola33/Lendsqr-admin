import type { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
  name: 'KarmaDashboard',
  path: 'karma',
  meta: { layout: 'DashboardLayout', requiresAuth: true },
  component: () => import('./KarmaView.vue'),
}
