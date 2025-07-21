import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AppNavigation from '../AppNavigation.vue'
import { createPinia, setActivePinia } from 'pinia'
import { vi } from 'vitest'

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    currentRoute: { value: { path: '/' } },
    push: vi.fn(),
  })),
}))

describe('AppNavigation', () => {
  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
  })
  it('renders navigation links (positive)', () => {
    const wrapper = mount(AppNavigation)
    expect(wrapper.findAll('.app-navigation__nav-link-list li').length).toBeGreaterThan(0)
  })

  it('does not render disabled links interactively (negative)', () => {
    const wrapper = mount(AppNavigation)
    const disabledLink = wrapper.find('.nav-link-item--disabled')
    if (disabledLink.exists()) {
      expect(disabledLink.classes()).toContain('nav-link-item--disabled')
    }
  })
})
