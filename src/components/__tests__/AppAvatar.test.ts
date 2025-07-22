import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AppAvatar from '../AppAvatar.vue'

describe('AppAvatar', () => {
  it('renders provided image (positive)', async () => {
    const ImageMock = vi.fn().mockImplementation(() => ({
      onload: () => {},
      onerror: () => {},
      src: '',
    }))

    vi.stubGlobal('Image', ImageMock)

    const wrapper = mount(AppAvatar, {
      props: { image: { src: 'test.jpg', alt: 'Test' }, name: 'Name' },
    })

    // Trigger onload manually
    const imgInstance = ImageMock.mock.results[0].value
    imgInstance.src = 'test.jpg'
    imgInstance.onload()

    await wrapper.vm.$nextTick()
    expect(wrapper.find('img').attributes('src')).toBe('test.jpg')
  })

  it('falls back to default image (negative)', () => {
    const wrapper = mount(AppAvatar, { props: { name: 'Name' } })
    expect(wrapper.find('img').attributes('src')).toBe('/images/profile.jpg')
  })
})
