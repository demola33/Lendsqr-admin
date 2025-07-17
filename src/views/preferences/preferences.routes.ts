import type { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
  name: 'PreferencesDashboard',
  path: 'preferences',
  meta: { layout: 'DashboardLayout', requiresAuth: true },
  component: () => import('./PreferencesView.vue'),
}
