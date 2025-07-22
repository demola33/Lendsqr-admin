import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppInput from '../AppInput.vue'

describe('AppInput', () => {
  it('renders with label and updates value (positive)', async () => {
    const wrapper = mount(AppInput, {
      props: { id: 'test', label: 'Test Label', modelValue: '' },
    })
    expect(wrapper.find('label').text()).toContain('Test Label')
    await wrapper.find('input').setValue('test value')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('does not allow interaction when disabled (negative)', () => {
    const wrapper = mount(AppInput, {
      props: { id: 'test', label: 'Test', disabled: true },
    })
    expect(wrapper.find('input').element.disabled).toBe(true)
  })
})
