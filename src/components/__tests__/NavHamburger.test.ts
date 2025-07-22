import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NavHamburger from '../NavHamburger.vue'

describe('NavHamburger', () => {
  it('toggles open state (positive)', async () => {
    const wrapper = mount(NavHamburger)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('toggle')).toBeTruthy()
  })

  it('is closed initially (negative)', () => {
    const wrapper = mount(NavHamburger)
    expect(wrapper.findAll('.hamburger-toggle__line').length).toBe(3)
  })
})
