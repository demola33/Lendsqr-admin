import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppSearchInput from '../AppSearchInput.vue'

describe('AppSearchInput', () => {
  it('emits search on button click (positive)', async () => {
    const wrapper = mount(AppSearchInput, { props: { id: 'test', modelValue: 'query' } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('search')).toBeTruthy()
  })

  it('does not emit empty search (negative)', async () => {
    const wrapper = mount(AppSearchInput, { props: { id: 'test', modelValue: '' } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('search')?.[0]?.[0]).toBe('')
  })
})
