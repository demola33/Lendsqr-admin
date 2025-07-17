import type { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
  name: 'HomeDashboard',
  path: 'home',
  meta: { layout: 'DashboardLayout', requiresAuth: true },
  children: [
    {
      name: 'Home',
      path: '',
      component: () => import('./HomeView.vue'),
    },
  ],
}
