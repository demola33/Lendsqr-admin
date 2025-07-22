import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppNavigationItem from '../AppNavigationItem.vue'
import { vi } from 'vitest'

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    currentRoute: { value: { path: '/' } },
  })),
}))

describe('AppNavigationItem', () => {
  it('renders text and icon (positive)', () => {
    const wrapper = mount(AppNavigationItem, {
      props: { text: 'Test', icon: 'Home' },
      global: {
        stubs: {
          AppIcon: true,
          RouterLink: true,
        },
      },
    })
    expect(wrapper.text()).toContain('Test')
    expect(wrapper.find('.nav-link-item__nav-link-icon').exists()).toBe(true)
  })

  it('applies disabled class (negative)', () => {
    const wrapper = mount(AppNavigationItem, {
      props: { text: 'Test', icon: 'Home', disabled: true },
      global: {
        stubs: {
          AppIcon: true,
          RouterLink: true,
        },
      },
    })
    expect(wrapper.classes()).toContain('nav-link-item--disabled')
  })
})
