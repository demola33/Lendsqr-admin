import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LendsqrLogo from '../LendsqrLogo.vue'

describe('LendsqrLogo', () => {
  it('renders SVG with medium size (positive)', () => {
    const wrapper = mount(LendsqrLogo, { props: { size: 'medium' } })
    expect(wrapper.find('svg').exists()).toBe(true)
    expect(wrapper.classes()).toContain('lendsqr-logo--medium')
  })

  it('does not apply invalid size (negative)', () => {
    const wrapper = mount(LendsqrLogo)
    expect(wrapper.classes()).not.toContain('lendsqr-logo--invalid')
  })
})
