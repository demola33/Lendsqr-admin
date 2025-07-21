import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppDropdown from '../AppDropdown.vue'

describe('AppDropdown', () => {
  const options = [
    { label: 'Option1', value: '1' },
    { label: 'Option2', value: '2' },
  ]
  it('renders options and selects value (positive)', async () => {
    const wrapper = mount(AppDropdown, {
      props: { id: 'test', label: 'Test', options, modelValue: '' },
    })
    await wrapper.find('select').setValue('1')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('is disabled (negative)', () => {
    const wrapper = mount(AppDropdown, {
      props: { id: 'test', label: 'Test', options, modelValue: '', disabled: true },
    })
    expect(wrapper.find('select').element.disabled).toBe(true)
  })
})
