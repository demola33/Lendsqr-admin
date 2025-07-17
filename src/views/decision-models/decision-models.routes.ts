import type { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
  name: 'DecisionModelsDashboard',
  path: 'decision-models',
  meta: { layout: 'DashboardLayout', requiresAuth: true },
  component: () => import('./DecisionModelsView.vue'),
}
