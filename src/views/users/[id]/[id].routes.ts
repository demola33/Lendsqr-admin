import type { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
  name: 'UserDetails',
  path: ':id',
  meta: { layout: 'DashboardLayout', requiresAuth: true },
  component: () => import('./UserDetailsView.vue'),
}
