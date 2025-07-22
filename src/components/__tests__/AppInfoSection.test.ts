import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppInfoSection from '../AppInfoSection.vue'

describe('AppInfoSection', () => {
  const items = [{ title: 'Test', value: 'Value' }]
  it('renders header and items (positive)', () => {
    const wrapper = mount(AppInfoSection, { props: { header: 'Test', items } })
    expect(wrapper.find('.app-info-section__header').text()).toBe('Test')
    expect(wrapper.findAll('.app-info-section__item').length).toBe(1)
  })

  it('renders no items when empty (negative)', () => {
    const wrapper = mount(AppInfoSection, { props: { header: 'Test', items: [] } })
    expect(wrapper.findAll('.app-info-section__item').length).toBe(0)
  })
})
