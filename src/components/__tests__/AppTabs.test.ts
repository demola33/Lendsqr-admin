import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppTabs from '../AppTabs.vue'

describe('AppTabs', () => {
  it('renders tabs list (positive)', () => {
    const wrapper = mount(AppTabs)
    expect(wrapper.find('.app-tabs__list').exists()).toBe(true)
  })

  it('handles empty slots (negative)', () => {
    const wrapper = mount(AppTabs)
    expect(wrapper.find('.app-tabs__content').exists()).toBe(false) // Assuming no content slot
  })
})
