import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from '@/views/auth/auth.routes'
import { useAuthStore } from '@/stores/auth'
import homeRoutes from '@/views/home/home.routes'
import usersRoutes from '@/views/users/users.routes'
import loansRoutes from '@/views/loans/loans.routes'
import guarantorsRoutes from '@/views/guarantors/guarantors.routes'
import decisionModelsRoutes from '@/views/decision-models/decision-models.routes'
import savingsRoutes from '@/views/savings/savings.routes'
import loanRequestsRoutes from '@/views/loan-requests/loan-requests.routes'
import whiteListRoutes from '@/views/white-list/white-list.routes'
import karmaRoutes from '@/views/karma/karma.routes'
import organizationRoutes from '@/views/organization/organization.routes'
import loanProductsRoutes from '@/views/loan-products/loan-products.routes'
import savingsProductsRoutes from '@/views/savings-products/savings-products.routes'
import feesAndChargesRoutes from '@/views/fees-and-charges/fees-and-charges.routes'
import transactionsRoutes from '@/views/transactions/transactions.routes'
import servicesRoutes from '@/views/services/services.routes'
import serviceAccountRoutes from '@/views/service-account/service-account.routes'
import settlementsRoutes from '@/views/settlements/settlements.routes'
import reportsRoutes from '@/views/reports/reports.routes'
import preferencesRoutes from '@/views/preferences/preferences.routes'
import feesAndPricingRoutes from '@/views/fees-and-pricing/fees-and-pricing.routes'
import auditLogsRoutes from '@/views/audit-logs/audit-logs.routes'
import systemsMessagesRoutes from '@/views/systems-messages/systems-messages.routes'

const routes = [
  {
    path: '',
    redirect: '/home',
    children: [
      ...authRoutes,
      homeRoutes,
      usersRoutes,
      guarantorsRoutes,
      loansRoutes,
      decisionModelsRoutes,
      savingsRoutes,
      loanRequestsRoutes,
      whiteListRoutes,
      karmaRoutes,
      organizationRoutes,
      loanProductsRoutes,
      savingsProductsRoutes,
      feesAndChargesRoutes,
      transactionsRoutes,
      servicesRoutes,
      serviceAccountRoutes,
      settlementsRoutes,
      reportsRoutes,
      preferencesRoutes,
      feesAndPricingRoutes,
      auditLogsRoutes,
      systemsMessagesRoutes,
    ],
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
