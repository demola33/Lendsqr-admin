import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from '@/views/auth/auth.routes'
import { useAuthStore } from '@/stores/auth'

const routes = [
  ...authRoutes,
  {
    path: '/home',
    name: 'home',
    meta: { requiresAuth: true, layout: 'DashboardLayout' },
    component: () => import('@/views/home/HomeView.vue'),
  },
  {
    path: '/',
    redirect: '/home',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

//Authentication middleware
router.beforeEach((to) => {
  const authStore = useAuthStore()

  // Redirect to login if route requires auth and user is not authenticated
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login' }
  }

  // Redirect to dashboard if user is authenticated and tries to access login
  if (to.name === 'login' && authStore.isAuthenticated) {
    return { name: 'home' }
  }
})

export default router
