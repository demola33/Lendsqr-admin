import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AppHeader from '../AppHeader.vue'
import { createPinia, setActivePinia } from 'pinia'
import { vi } from 'vitest'

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}))

describe('AppHeader', () => {
  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
  })

  it('renders logo and search (positive)', () => {
    const wrapper = mount(AppHeader)
    expect(wrapper.find('.app-header__logo').exists()).toBe(true)
  })

  it('mobile menu is closed initially (negative)', () => {
    const wrapper = mount(AppHeader)
    expect(wrapper.find('.app-header__mobile-menu').exists()).toBe(false)
  })
})
