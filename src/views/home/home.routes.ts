import type { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
  name: 'Dashboard',
  path: 'home',
  meta: { layout: 'dashboard' },
  children: [
    {
      name: 'User Dashboard',
      path: '',
      component: () => import('./HomeView.vue'),
    },
  ],
}
