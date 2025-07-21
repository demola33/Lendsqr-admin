import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { useAuthStore } from '@/stores/auth'
import * as authService from '@/services/auth'
import type { AdminUser } from '@/types'

vi.mock('@/services/auth')

describe('Auth Store', () => {
  let pinia

  beforeEach(() => {
    pinia = createPinia()
    pinia.use(piniaPluginPersistedstate)
    setActivePinia(pinia)
    localStorage.clear()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('logs in successfully with valid credentials', async () => {
    const mockUser: AdminUser = {
      id: 'admin-001',
      name: 'Admin',
      email: 'admin@smartlenders.com',
      role: 'admin',
      organization: 'global',
      imageUrl: '',
    }
    const mockToken = 'mock-jwt-token'
    vi.mocked(authService.loginAdmin).mockResolvedValue({ user: mockUser, token: mockToken })

    const store = useAuthStore()
    await store.login('admin@smartlenders.com', 'defaultPassword')

    expect(store.adminUser).toEqual(mockUser)
    expect(store.token).toBe(mockToken)
    expect(localStorage.getItem('authToken')).toBe(mockToken)
  })

  it('fails to login with invalid credentials', async () => {
    vi.mocked(authService.loginAdmin).mockRejectedValue(new Error('Invalid credentials'))

    const store = useAuthStore()
    await expect(store.login('wrong@email.com', 'wrongpass')).rejects.toThrow('Invalid credentials')

    expect(store.adminUser).toBeNull()
    expect(store.token).toBeNull()
    expect(localStorage.getItem('authToken')).toBeNull()
  })
})
