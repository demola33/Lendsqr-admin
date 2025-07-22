import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import UserProfileDropdown from '../UserProfileDropdown.vue'
import { createPinia, setActivePinia } from 'pinia'
import { vi } from 'vitest'

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}))

describe('UserProfileDropdown', () => {
  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
  })
  it('renders avatar (positive)', () => {
    const wrapper = mount(UserProfileDropdown)
    expect(wrapper.find('.app-author__image').exists()).toBe(true)
  })

  it('handles no user state (negative)', () => {
    const wrapper = mount(UserProfileDropdown)
    expect(wrapper.find('.app-author__name').text()).toBe('')
  })
})
