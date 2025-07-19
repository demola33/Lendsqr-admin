import type { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
  name: 'SystemsMessagesDashboard',
  path: 'systems-messages',
  meta: { layout: 'DashboardLayout', requiresAuth: true },
  component: () => import('./SystemsMessagesView.vue'),
}
