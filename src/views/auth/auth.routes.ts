import type { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw[]>[
  {
    path: '/login',
    name: 'login',
    meta: { requiresAuth: false, layout: 'GuestLayout' },
    component: () => import('./LoginView.vue'),
  },
]
