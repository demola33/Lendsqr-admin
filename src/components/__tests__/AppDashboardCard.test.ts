import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppDashboardCard from '../AppDashboardCard.vue'

describe('AppDashboardCard', () => {
  it('renders title and value (positive)', () => {
    const wrapper = mount(AppDashboardCard, {
      props: { icon: 'Home', title: 'Test', value: '100', color: '#000' },
    })
    expect(wrapper.text()).toContain('TEST')
    expect(wrapper.text()).toContain('100')
  })

  it('handles invalid color gracefully (negative)', () => {
    const wrapper = mount(AppDashboardCard, {
      props: { icon: 'Home', title: 'Test', value: '100', color: 'invalid' },
    })
    expect(() => wrapper.vm.color).not.toThrow()
  })
})
