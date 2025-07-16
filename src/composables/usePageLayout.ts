import DashboardLayout from '@/layouts/DashboardLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'

import type { LayoutName } from '@/types/layouts'
import { computed, type ComputedRef, type Component } from 'vue'
import { useRouter } from 'vue-router'

function selectLayoutComponent(name: LayoutName): Component {
  switch (name) {
    case 'DashboardLayout': {
      return DashboardLayout
    }
    case 'GuestLayout': {
      return GuestLayout
    }
    default: {
      return DefaultLayout
    }
  }
}

export interface PageLayoutData {
  /**
   * The computed LayoutComponent for the current route.
   */
  readonly LayoutComponent: ComputedRef<Component>
}

/**
 * Returns the layout component based on the current route's given layout value.
 *
 * @returns {LayoutComponent} An object containing the computed LayoutComponent.
 */
export default function usePageLayout(): PageLayoutData {
  const router = useRouter()
  const name = computed(() => {
    return router.currentRoute.value.meta.layout ?? 'DefaultLayout'
  })

  const LayoutComponent = computed(() => {
    return selectLayoutComponent(name.value as LayoutName)
  })

  return {
    LayoutComponent,
  }
}
