import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import AppIcon from '../AppIcon.vue'

vi.mock('vue', async () => {
  const actual = await vi.importActual('vue')
  return {
    ...actual,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    defineAsyncComponent: (_loader: () => Promise<unknown>) => {
      return {
        props: {
          title: String,
          class: String,
        },
        setup(props: { title?: string; class?: string }) {
          return () => h('svg', { title: props.title, class: props.class })
        },
      }
    },
  }
})

describe('AppIcon', () => {
  it('renders valid icon (positive)', () => {
    const wrapper = mount(AppIcon, { props: { name: 'Home' } })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('handles invalid icon name (negative)', () => {
    // @ts-expect-error: Testing invalid prop
    expect(() => mount(AppIcon, { props: { name: 'Invalid' } })).not.toThrow()
  })
})
